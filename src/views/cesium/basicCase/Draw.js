// Draw.js 绘制方法
import * as Cesium from 'cesium'
export default class Draw {
  constructor(viewer, config) {
    this.viewer = viewer;
    this.config = config || {
      borderColor: Cesium.Color.BLUE,
      borderWidth: 2,
      material: Cesium.Color.GREEN.withAlpha(0.5),
    };
    this.infoDetail = { point: [], line: [], rectangle: [], circle: [], planeSelf: [], sector: [] };
    //判断是否右键销毁
    this.isDestroy = false
    //是否是销毁状态
    this.isRemove = false
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
  }
  /******* 
    * @function: function
    * @description: 绘制点
    */
  drawPoint() {
    if (this.handler && !this.isDestroy) {
      this.handler.destroy();
    }
    this.isDestroy = false
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    this.handler.setInputAction((click) => {
      let cartesian = this.viewer.camera.pickEllipsoid(click.position, this.viewer.scene.globe.ellipsoid);
      let cartographic = Cesium.Cartographic.fromCartesian(cartesian, this.viewer.scene.globe.ellipsoid, new Cesium.Cartographic());
      let lng = Cesium.Math.toDegrees(cartographic.longitude);
      let lat = Cesium.Math.toDegrees(cartographic.latitude);
      let id = new Date().getTime();
      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(lng, lat, 0),
        name: 'point',
        id: id,
        point: {
          color: this.config.material,
          pixelSize: 12,
          outlineColor: this.config.borderColor,
          outlineWidth: this.config.borderWidth,
        },
      });
      this.infoDetail.point.push({ id: id, position: [lng, lat] });
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    this.handler.setInputAction((click) => {
      if (this.handler) {
        this.isDestroy = true
        this.handler.destroy();
        //重新点击进行绘制
        this.drawPoint()
      }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }
  /******* 
    * @function: function
    * @description: 绘制矩形区域
    */
  drawRectangle() {
    if (this.handler && !this.isDestroy) {
      this.handler.destroy();
    }
    this.isRemove = false
    this.isDestroy = false
    let westSouthEastNorth = [];
    let id = null;
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    this.handler.setInputAction((click) => {
      let cartesian = this.viewer.camera.pickEllipsoid(click.position, this.viewer.scene.globe.ellipsoid);
      let cartographic = Cesium.Cartographic.fromCartesian(cartesian, this.viewer.scene.globe.ellipsoid, new Cesium.Cartographic());
      let lng1 = Cesium.Math.toDegrees(cartographic.longitude);
      let lat1 = Cesium.Math.toDegrees(cartographic.latitude);
      westSouthEastNorth = [lng1, lat1];
      id = new Date().getTime();
      if (westSouthEastNorth) {
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }
      let polygons = this.viewer.entities.add({
        name: 'rectangle',
        id: id,
        polygon: {
          hierarchy: new Cesium.CallbackProperty(function () {
            return {
              positions: Cesium.Cartesian3.fromDegreesArray(westSouthEastNorth),
            };
          }, false),
          height: 0,
          material: this.config.material,
          fill: true,
          show: true,
        },
        polyline: {
          positions: new Cesium.CallbackProperty(function () { return Cesium.Cartesian3.fromDegreesArray(westSouthEastNorth); }, false),
          material: this.config.borderColor,
          width: this.config.borderWidth,
          zIndex: 1,
        },
      });
      this.handler.setInputAction((move) => {
        let cartesian = this.viewer.camera.pickEllipsoid(move.endPosition, this.viewer.scene.globe.ellipsoid);
        let cartographic = Cesium.Cartographic.fromCartesian(cartesian, this.viewer.scene.globe.ellipsoid, new Cesium.Cartographic());
        let lng = Cesium.Math.toDegrees(cartographic.longitude);
        let lat = Cesium.Math.toDegrees(cartographic.latitude);
        westSouthEastNorth = [lng1, lat1, lng1, lat, lng, lat, lng, lat1, lng1, lat1];
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //右键完成绘制
    this.handler.setInputAction(() => {
      if (this.handler) {
        this.isDestroy = true
        this.handler.destroy();
        //重新点击进行绘制
        this.drawRectangle()
      }
      this.infoDetail.rectangle.push({ id: id, position: westSouthEastNorth });
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }
  /******* 
   * @function: function
   * @description: 绘制圆形区域，并计算面积和周长，同时支持拖动
   */
  drawCircle() {
    if (this.handler && !this.isDestroy) {
      this.handler.destroy();
    }
    this.isRemove = false;
    this.isDestroy = false;
    let id = null;
    let radius = 0;
    let lngLat = [];
    let circleEntity = null;

    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    this.handler.setInputAction((click) => {
      id = new Date().getTime();
      let cartesian = this.viewer.camera.pickEllipsoid(click.position, this.viewer.scene.globe.ellipsoid);
      let cartographic = Cesium.Cartographic.fromCartesian(cartesian, this.viewer.scene.globe.ellipsoid);
      let lng = Cesium.Math.toDegrees(cartographic.longitude);
      let lat = Cesium.Math.toDegrees(cartographic.latitude);
      lngLat = [lng, lat];

      circleEntity = this.viewer.entities.add({
        position: new Cesium.CallbackProperty(function () { return Cesium.Cartesian3.fromDegrees(...lngLat, 0); }, false),
        name: 'circle',
        id: id,
        ellipse: {
          height: 0,
          outline: true,
          material: this.config.material,
          outlineColor: this.config.borderColor,
          outlineWidth: this.config.borderWidth,
          semiMajorAxis: new Cesium.CallbackProperty(function () { return radius; }, false),
          semiMinorAxis: new Cesium.CallbackProperty(function () { return radius; }, false),
        },
      });

      this.handler.setInputAction((move) => {
        let cartesian2 = this.viewer.camera.pickEllipsoid(move.endPosition, this.viewer.scene.globe.ellipsoid);
        radius = Cesium.Cartesian3.distance(cartesian, cartesian2);
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      // 完成圆形绘制后，允许拖动
      this.handler.setInputAction(() => {
        // 计算面积（πr²）和周长（2πr）
        let area = Math.PI * Math.pow(radius, 2); // 单位：平方米
        let circumference = 2 * Math.PI * radius; // 单位：米

        this.infoDetail.circle.push({
          id: id,
          center: lngLat,
          radius: radius,
          area: area, // 保存面积
          circumference: circumference // 保存周长
        });

        if (this.handler) {
          this.isDestroy = true;
          this.handler.destroy();
          this.drawCircle();
          this.enableCircleDragging(circleEntity, id); // 启用拖动功能
        }
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  /******* 
   * @function: function
   * @description: 绘制自定义区域，并计算面积，同时支持拖动
   */
  drawPlane() {
    if (this.handler && !this.isDestroy) {
      this.handler.destroy();
    }
    this.isRemove = false;
    this.isDestroy = false;
    let id = new Date().getTime();
    let positions = [];
    let codeInfo = [];
    let polygon = new Cesium.PolygonHierarchy();
    let _polygonEntity = new Cesium.Entity();
    let polyObj = null;

    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    this.handler.setInputAction((movement) => {
      let cartesian = this.viewer.camera.pickEllipsoid(movement.position, this.viewer.scene.globe.ellipsoid);
      let cartographic = Cesium.Cartographic.fromCartesian(cartesian, this.viewer.scene.globe.ellipsoid);
      let lng = Cesium.Math.toDegrees(cartographic.longitude);
      let lat = Cesium.Math.toDegrees(cartographic.latitude);
      if (cartesian && cartesian.x) {
        if (positions.length == 0) {
          positions.push(cartesian.clone());
        }
        codeInfo.push([lng, lat]);
        positions.push(cartesian.clone());
        polygon.positions.push(cartesian.clone());
        if (!polyObj) {
          _polygonEntity.polyline = {
            width: this.config.borderWidth,
            material: this.config.borderColor,
            clampToGround: false,
          };
          _polygonEntity.polyline.positions = new Cesium.CallbackProperty(function () {
            return positions;
          }, false);
          _polygonEntity.polygon = {
            hierarchy: new Cesium.CallbackProperty(function () {
              return polygon;
            }, false),
            material: this.config.material,
            clampToGround: false,
          };
          _polygonEntity.name = 'planeSelf';
          _polygonEntity._id = id;
          polyObj = this.viewer.entities.add(_polygonEntity);
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    this.handler.setInputAction((movement) => {
      let cartesian = this.viewer.camera.pickEllipsoid(movement.endPosition, this.viewer.scene.globe.ellipsoid);
      let cartographic = Cesium.Cartographic.fromCartesian(cartesian, this.viewer.scene.globe.ellipsoid);
      let lng = Cesium.Math.toDegrees(cartographic.longitude);
      let lat = Cesium.Math.toDegrees(cartographic.latitude);
      if (positions.length >= 0) {
        if (cartesian && cartesian.x) {
          positions.pop();
          positions.push(cartesian);
          polygon.positions.pop();
          polygon.positions.push(cartesian);
          codeInfo.pop();
          codeInfo.push([lng, lat]);
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // 右键完成绘制
    this.handler.setInputAction((movement) => {
      // 计算多边形面积
      let area = this.calculatePolygonArea(positions);

      this.infoDetail.planeSelf.push({
        id: id,
        positions: codeInfo,
        area: area // 保存面积
      });

      if (this.handler) {
        this.isDestroy = true;
        this.handler.destroy();
        this.drawPlane();
        this.enablePolygonDragging(polyObj, id); // 启用拖动功能
      }
      positions.push(positions[0]);
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }

  /******* 
   * @function: function
   * @description: 绘制线段并计算其长度
   */
  drawLine() {
    if (this.handler && !this.isDestroy) {
      this.handler.destroy();
    }
    this.isRemove = false;
    this.isDestroy = false;
    let id = null;
    let positions = [];
    let codeInfo = [];
    let polyObj = null;
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    this.handler.setInputAction((movement) => {
      id = new Date().getTime();
      let cartesian = this.viewer.camera.pickEllipsoid(movement.position, this.viewer.scene.globe.ellipsoid);
      let cartographic = Cesium.Cartographic.fromCartesian(cartesian, this.viewer.scene.globe.ellipsoid);
      let lng = Cesium.Math.toDegrees(cartographic.longitude);
      let lat = Cesium.Math.toDegrees(cartographic.latitude);

      if (cartesian && cartesian.x) {
        if (positions.length == 0) {
          positions.push(cartesian.clone());
        }
        codeInfo.push([lng, lat]);
        positions.push(cartesian.clone());

        if (!polyObj) {
          polyObj = this.viewer.entities.add({
            polyline: {
              positions: new Cesium.CallbackProperty(() => positions, false),
              width: this.config.borderWidth,
              material: this.config.borderColor,
              clampToGround: false,
            },
            name: 'line',
            id: id,
          });
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    this.handler.setInputAction((movement) => {
      let cartesian = this.viewer.camera.pickEllipsoid(movement.endPosition, this.viewer.scene.globe.ellipsoid);
      let cartographic = Cesium.Cartographic.fromCartesian(cartesian, this.viewer.scene.globe.ellipsoid);
      let lng = Cesium.Math.toDegrees(cartographic.longitude);
      let lat = Cesium.Math.toDegrees(cartographic.latitude);

      if (positions.length >= 0) {
        if (cartesian && cartesian.x) {
          positions.pop();
          positions.push(cartesian);
          codeInfo.pop();
          codeInfo.push([lng, lat]);
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // 右键完成绘制
    this.handler.setInputAction(() => {
      // 计算线段长度
      let length = this.calculateLineLength(positions);

      this.infoDetail.line.push({
        id: id,
        positions: codeInfo,
        length: length // 保存线段长度
      });

      if (this.handler) {
        this.isDestroy = true;
        this.handler.destroy();
        this.drawLine(); // 重新启用绘制功能
      }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }
  /******* 
   * @function: function
   * @description: 计算扇形的面积
   */
  calculateSectorArea(radius, startAngle, endAngle) {
    let angleDiff = endAngle - startAngle;
    if (angleDiff < 0) {
      angleDiff += 2 * Math.PI;  // 确保角度差为正
    }
    return 0.5 * Math.pow(radius, 2) * angleDiff;
  }

  /******* 
   * @function: function
   * @description: 计算扇形的弧长
   */
  calculateArcLength(radius, startAngle, endAngle) {
    let angleDiff = endAngle - startAngle;
    return radius * angleDiff; // 单位：米
  }

  /******* 
   * @function: function
   * @description: 计算扇形的边界点
   */
  computeSectorPositions(center, radius, startAngle, endAngle) {
    const positions = [];
    const numPoints = 50; // 调整为更平滑或更粗糙的扇形
    const angleDiff = endAngle - startAngle;

    for (let i = 0; i <= numPoints; i++) {
      const angle = startAngle + (i * angleDiff) / numPoints;
      const x = center.x + radius * Math.cos(angle);
      const y = center.y + radius * Math.sin(angle);
      positions.push(new Cesium.Cartesian3(x, y, center.z));
    }

    positions.push(center);
    return positions;
  }

  /******* 
   * @function: function
   * @description: 绘制扇形，并计算面积和弧长
   */
  drawSector() {
    if (this.handler && !this.isDestroy) {
      this.handler.destroy();
    }
    this.isRemove = false;
    this.isDestroy = false;
    let id = null;
    let center = null;
    let radius = 0;
    let startAngle = 0;
    let endAngle = 0;
    let positions = [];

    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    // 第一次点击确定中心点
    this.handler.setInputAction((click) => {
      id = new Date().getTime();
      center = this.viewer.camera.pickEllipsoid(click.position, this.viewer.scene.globe.ellipsoid);
      if (!center) return;
      const cartographic = Cesium.Cartographic.fromCartesian(center);
      const lng = Cesium.Math.toDegrees(cartographic.longitude);
      const lat = Cesium.Math.toDegrees(cartographic.latitude);

      let entity = this.viewer.entities.add({
        id: id,
        position: center,
        polygon: {
          hierarchy: new Cesium.CallbackProperty(() => new Cesium.PolygonHierarchy(positions), false),
          material: this.config.material,
          outline: true,
          outlineColor: this.config.borderColor,
          outlineWidth: this.config.borderWidth,
        },
      });

      this.handler.setInputAction((move) => {
        const movePosition = this.viewer.camera.pickEllipsoid(move.endPosition, this.viewer.scene.globe.ellipsoid);
        if (!movePosition) return;
        radius = Cesium.Cartesian3.distance(center, movePosition);
        const cartographicMove = Cesium.Cartographic.fromCartesian(movePosition);
        const lngMove = Cesium.Math.toDegrees(cartographicMove.longitude);
        const latMove = Cesium.Math.toDegrees(cartographicMove.latitude);

        endAngle = Math.atan2(latMove - lat, lngMove - lng);

        // 动态计算扇形边界点
        positions = this.computeSectorPositions(center, radius, startAngle, endAngle);
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      // 设置起始角度
      this.handler.setInputAction((click) => {
        const startCartesian = this.viewer.camera.pickEllipsoid(click.position, this.viewer.scene.globe.ellipsoid);
        if (!startCartesian) return;
        const cartographicStart = Cesium.Cartographic.fromCartesian(startCartesian);
        const lngStart = Cesium.Math.toDegrees(cartographicStart.longitude);
        const latStart = Cesium.Math.toDegrees(cartographicStart.latitude);
        startAngle = Math.atan2(latStart - lat, lngStart - lng);

        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    // 右键完成绘制
    this.handler.setInputAction(() => {
      // 计算扇形的面积和弧长
      let area = this.calculateSectorArea(radius, startAngle, endAngle);
      let arcLength = this.calculateArcLength(radius, startAngle, endAngle);

      this.infoDetail.sector.push({
        id: id,
        center: Cesium.Cartographic.fromCartesian(center),
        radius: radius,
        startAngle: startAngle,
        endAngle: endAngle,
        area: area,         // 保存面积
        arcLength: arcLength // 保存弧长
      });

      if (this.handler) {
        this.isDestroy = true;
        this.handler.destroy();
        // 重新启用绘制功能
        this.drawSector();
      }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }

  /******* 
   * @function: function
   * @description: 通过坐标数组生成线段并计算长度
   */
  drawLineFromCoordinates(coordinates) {
    let id = new Date().getTime();
    let positions = coordinates.map(coord => {
      return Cesium.Cartesian3.fromDegrees(coord[0], coord[1]);
    });

    // 计算线段长度
    let length = this.calculateLineLength(positions);

    this.infoDetail.line.push({
      id: id,
      positions: coordinates,
      length: length // 保存线段长度
    });

    let _polygonEntity = new Cesium.Entity();
    _polygonEntity.polyline = {
      width: this.config.borderWidth,
      material: this.config.borderColor,
      clampToGround: false,
      positions: positions,
    };
    _polygonEntity.name = 'line';
    _polygonEntity._id = id;
    this.viewer.entities.add(_polygonEntity);
  }  /******* 
   * @function: function
   * @description: 计算线段的总长度
   */
  calculateLineLength(positions) {
    let totalLength = 0;

    for (let i = 0; i < positions.length - 1; i++) {
      let startCartographic = Cesium.Cartographic.fromCartesian(positions[i]);
      let endCartographic = Cesium.Cartographic.fromCartesian(positions[i + 1]);

      let startPos = Cesium.Cartesian3.fromRadians(
        startCartographic.longitude,
        startCartographic.latitude
      );
      let endPos = Cesium.Cartesian3.fromRadians(
        endCartographic.longitude,
        endCartographic.latitude
      );

      let segmentLength = Cesium.Cartesian3.distance(startPos, endPos);
      totalLength += segmentLength;
    }

    return totalLength; // 返回线段总长度，单位：米
  }
  /******* 
  /******* 
   * @function: function
   * @description: 通过坐标数组生成自定义区域，并计算面积
   */
  drawPlaneFromCoordinates(coordinates) {
    let id = new Date().getTime();
    let positions = coordinates.map(coord => {
      return Cesium.Cartesian3.fromDegrees(coord[0], coord[1]);
    });

    // 关闭区域，用第一个点作为最后一个点
    positions.push(positions[0]);

    // 计算多边形面积
    let area = this.calculatePolygonArea(positions);

    this.infoDetail.planeSelf.push({
      id: id,
      positions: coordinates,
      area: area // 保存面积
    });

    let polygonHierarchy = new Cesium.PolygonHierarchy(positions);
    let _polygonEntity = new Cesium.Entity();

    _polygonEntity.polyline = {
      width: this.config.borderWidth,
      material: this.config.borderColor,
      clampToGround: false,
      positions: positions,
    };

    _polygonEntity.polygon = {
      hierarchy: polygonHierarchy,
      material: this.config.material,
      clampToGround: false,
    };

    _polygonEntity.name = 'planeSelf';
    _polygonEntity._id = id;

    this.viewer.entities.add(_polygonEntity);
    this.enablePolygonDragging(_polygonEntity, id); // 启用拖动功能
  }
  /******* 
   * @function: function
   * @description: 启用多边形的拖动功能
   */
  enablePolygonDragging(polygonEntity, id) {
    this.dragHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    let isDragging = false;
    let originalPositions = null;

    this.dragHandler.setInputAction((click) => {
      const pickedObject = this.viewer.scene.pick(click.position);
      if (Cesium.defined(pickedObject) && pickedObject.id === polygonEntity) {
        isDragging = true;
        originalPositions = pickedObject.id.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

    this.dragHandler.setInputAction((movement) => {
      if (isDragging && polygonEntity) {
        const newCartesian = this.viewer.camera.pickEllipsoid(movement.endPosition, this.viewer.scene.globe.ellipsoid);
        if (newCartesian) {
          const deltaX = newCartesian.x - originalPositions[0].x;
          const deltaY = newCartesian.y - originalPositions[0].y;
          const deltaZ = newCartesian.z - originalPositions[0].z;

          const newPositions = originalPositions.map((position) => {
            return new Cesium.Cartesian3(
              position.x + deltaX,
              position.y + deltaY,
              position.z + deltaZ
            );
          });

          // 更新多边形和折线的位置信息
          polygonEntity.polygon.hierarchy = new Cesium.CallbackProperty(() => {
            return new Cesium.PolygonHierarchy(newPositions);
          }, false);

          polygonEntity.polyline.positions = new Cesium.CallbackProperty(() => {
            return newPositions;
          }, false);

          // 实时更新 infoDetail 中多边形的位置
          const polygonInfo = this.infoDetail.planeSelf.find(plane => plane.id === id);
          if (polygonInfo) {
            polygonInfo.positions = newPositions.map(pos => {
              const cartographic = Cesium.Cartographic.fromCartesian(pos);
              return [
                Cesium.Math.toDegrees(cartographic.longitude),
                Cesium.Math.toDegrees(cartographic.latitude)
              ];
            });
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    this.dragHandler.setInputAction(() => {
      isDragging = false;
    }, Cesium.ScreenSpaceEventType.LEFT_UP);
  }

  /******* 
   * @function: function
   * @description: 启用圆形的拖动功能
   */
  enableCircleDragging(circleEntity, id) {
    this.dragHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    let isDragging = false;
    let originalPosition = null;

    this.dragHandler.setInputAction((click) => {
      const pickedObject = this.viewer.scene.pick(click.position);
      if (Cesium.defined(pickedObject) && pickedObject.id === circleEntity) {
        isDragging = true;
        originalPosition = pickedObject.id.position.getValue(Cesium.JulianDate.now());
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

    this.dragHandler.setInputAction((movement) => {
      if (isDragging && circleEntity) {
        const newCartesian = this.viewer.camera.pickEllipsoid(movement.endPosition, this.viewer.scene.globe.ellipsoid);
        if (newCartesian) {
          circleEntity.position = new Cesium.CallbackProperty(() => newCartesian, false);

          const newCartographic = Cesium.Cartographic.fromCartesian(newCartesian);
          const newLngLat = [
            Cesium.Math.toDegrees(newCartographic.longitude),
            Cesium.Math.toDegrees(newCartographic.latitude)
          ];

          // 实时更新 infoDetail 中圆形的位置
          const circleInfo = this.infoDetail.circle.find(circle => circle.id === id);
          if (circleInfo) {
            circleInfo.center = newLngLat;
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    this.dragHandler.setInputAction(() => {
      if (isDragging && circleEntity) {
        const finalPosition = circleEntity.position.getValue(Cesium.JulianDate.now());
        const finalCartographic = Cesium.Cartographic.fromCartesian(finalPosition);
        const finalLngLat = [
          Cesium.Math.toDegrees(finalCartographic.longitude),
          Cesium.Math.toDegrees(finalCartographic.latitude)
        ];

        // 结束拖动后，更新 infoDetail 中的圆心坐标
        const circleInfo = this.infoDetail.circle.find(circle => circle.id === id);
        if (circleInfo) {
          circleInfo.center = finalLngLat;
        }
      }
      isDragging = false;
    }, Cesium.ScreenSpaceEventType.LEFT_UP);
  }
  /******* 
   * @function: function
   * @description: 通过坐标和半径生成圆形区域，并计算面积和周长
   */
  drawCircleFromCoordinates(center, radius) {
    let id = new Date().getTime();

    // 将中心点转换为 Cartesian3 坐标
    let centerCartesian = Cesium.Cartesian3.fromDegrees(center[0], center[1]);

    // 计算面积（πr²）和周长（2πr）
    let area = Math.PI * Math.pow(radius, 2); // 单位：平方米
    let circumference = 2 * Math.PI * radius; // 单位：米

    this.infoDetail.circle.push({
      id: id,
      center: center,
      radius: radius,
      area: area, // 保存面积
      circumference: circumference // 保存周长
    });

    let entity = this.viewer.entities.add({
      position: centerCartesian,
      name: 'circle',
      id: id,
      ellipse: {
        semiMajorAxis: radius,
        semiMinorAxis: radius,
        height: 0,
        outline: true,
        material: this.config.material,
        outlineColor: this.config.borderColor,
        outlineWidth: this.config.borderWidth,
      },
    });
    // 启用拖动功能
    this.enableCircleDragging(entity, id);
  }
  /******* 
      * @function: function
      * @description: 通过坐标、半径、起始角度和结束角度生成扇形，并计算面积和弧长
      */
  drawSectorFromCoordinates(center, radius, startAngle, endAngle) {
    let id = new Date().getTime();

    // 将中心点转换为 Cartesian3 坐标
    let centerCartesian = Cesium.Cartesian3.fromDegrees(center[0], center[1]);

    // 计算扇形的边界点
    let positions = this.computeSectorPositions(centerCartesian, radius, startAngle, endAngle);

    // 计算扇形的面积和弧长
    let area = this.calculateSectorArea(radius, startAngle, endAngle);
    let arcLength = this.calculateArcLength(radius, startAngle, endAngle);

    this.infoDetail.sector.push({
      id: id,
      center: center,
      radius: radius,
      startAngle: startAngle,
      endAngle: endAngle,
      area: area,         // 保存面积
      arcLength: arcLength // 保存弧长
    });

    let entity = this.viewer.entities.add({
      polygon: {
        hierarchy: new Cesium.PolygonHierarchy(positions),
        material: this.config.material,
        outline: true,
        outlineColor: this.config.borderColor,
        outlineWidth: this.config.borderWidth,
      },
      name: 'sector',
      id: id,
    });
  }
  /******* 
     * @function: function
     * @description: 移除绘制对象
     */
  removeEntity() {
    if (this.handler && !this.isDestroy) {
      this.handler.destroy();
    }
    this.isRemove = true
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    this.handler.setInputAction((move) => {
      let pick = this.viewer.scene.pick(move.endPosition);
      if (pick && pick.id && pick.id.id && this.isRemove) {
        document.body.style.cursor = 'pointer';
        this.handler.setInputAction((click) => {
          let newPoint;
          switch (pick.id.name) {
            case 'point':
              newPoint = this.infoDetail.point.filter((item) => item.id != pick.id._id);
              this.infoDetail.point = newPoint;
              break;
            case 'line':
              newPoint = this.infoDetail.line.filter((item) => item.id != pick.id._id);
              this.infoDetail.line = newPoint;
              break;
            case 'rectangle':
              newPoint = this.infoDetail.rectangle.filter((item) => item.id != pick.id._id);
              this.infoDetail.rectangle = newPoint;
              break;
            case 'planeSelf':
              newPoint = this.infoDetail.planeSelf.filter((item) => item.id != pick.id._id);
              this.infoDetail.planeSelf = newPoint;
              break;
            case 'circle':
              newPoint = this.infoDetail.circle.filter((item) => item.id != pick.id._id);
              this.infoDetail.circle = newPoint;
              break;
            case 'sector':
              newPoint = this.infoDetail.sector.filter((item) => item.id != pick.id._id);
              this.infoDetail.sector = newPoint;
              break;
            default:
              break;
          }
          this.viewer.entities.remove(pick.id);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      } else {
        document.body.style = 'cursor: default;';
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  backInfoDetail() {
    return this.infoDetail;
  }
}

