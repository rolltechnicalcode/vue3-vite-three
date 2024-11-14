import { defineMock } from "./base"

export default defineMock([
  {
    url: "menus/routes",
    method: ["GET"],
    body: {
      code: "00000",
      data: [
        {
          path: "/mapWorld",
          component: "Layout",
          name: "/mapWorld",
          children: [
            {
              path: "mapWorld",
              component: "mapWorld/index",
              name: "mapWorld",
              meta: {
                title: "天地图案例",
                icon: "three",
                hidden: false,
                keepAlive: true,
                alwaysShow: false,
                params: null,
              },
            },
          ],
        },
        {
          path: "/three",
          component: "Layout",
          name: "/three",
          children: [
            {
              path: "three",
              component: "three/index",
              name: "three",
              meta: {
                title: "Three.js案例",
                icon: "three",
                hidden: false,
                keepAlive: true,
                alwaysShow: false,
                params: null,
              },
            },
          ],
        },
        {
          path: "/cesium",
          component: "Layout",
          name: "/cesium",
          meta: {
            title: "系统工具",
            icon: "menu",
            hidden: false,
            alwaysShow: false,
            params: null,
          },
          children: [
            {
              path: "cesium",
              component: "cesium/index",
              name: "cesium",
              meta: {
                title: "Cesium案例",
                icon: "el-icon-Football",
                hidden: false,
                keepAlive: true,
                alwaysShow: false,
                params: null,
              },
            },
          ],
        },
        {
          path: "/flowchart",
          component: "Layout",
          name: "/flowchart",
          meta: {
            title: "系统工具",
            icon: "menu",
            hidden: false,
            alwaysShow: false,
            params: null,
          },
          children: [
            {
              path: "flowchart",
              component: "flowchart/index",
              name: "flowchart",
              meta: {
                title: "流程图",
                icon: "el-icon-Share",
                hidden: false,
                keepAlive: true,
                alwaysShow: false,
                params: null,
              },
            },
          ],
        },
        {
          path: "/codegen",
          component: "Layout",
          name: "/codegen",
          meta: {
            title: "系统工具",
            icon: "menu",
            hidden: false,
            alwaysShow: false,
            params: null,
          },
          children: [
            {
              path: "codegen",
              component: "codegen/index",
              name: "Codegen",
              meta: {
                title: "代码生成",
                icon: "code",
                hidden: false,
                keepAlive: true,
                alwaysShow: false,
                params: null,
              },
            },
          ],
        },
        {
          path: "/system",
          component: "Layout",
          redirect: "/system/user",
          name: "/system",
          meta: {
            title: "系统管理",
            icon: "system",
            hidden: false,
            alwaysShow: false,
            params: null,
          },
          children: [
            {
              path: "user",
              component: "system/user/index",
              name: "User",
              meta: {
                title: "用户管理",
                icon: "el-icon-User",
                hidden: false,
                keepAlive: true,
                alwaysShow: false,
                params: null,
              },
            },
            {
              path: "role",
              component: "system/role/index",
              name: "Role",
              meta: {
                title: "角色管理",
                icon: "role",
                hidden: false,
                keepAlive: true,
                alwaysShow: false,
                params: null,
              },
            },
            {
              path: "menu",
              component: "system/menu/index",
              name: "SysMenu",
              meta: {
                title: "菜单管理",
                icon: "menu",
                hidden: false,
                keepAlive: true,
                alwaysShow: false,
                params: null,
              },
            },
          ]
        },
      ],
      msg: "一切ok",
    },
  },
])
