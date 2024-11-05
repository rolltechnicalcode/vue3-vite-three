import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const loader = new GLTFLoader();
const model = new THREE.Group();
loader.load("/model/士兵.glb", function (gltf) {
    console.log('控制台查看gltf对象结构', gltf);
    model.add(gltf.scene);
    const mixer = new THREE.AnimationMixer(gltf.scene);
    // gltf.animations[0] Idle  休息
    // gltf.animations[1] Run   跑步
    // gltf.animations[2] TPose T形静止展开
    // gltf.animations[3] Walk  走路
    const IdleAction = mixer.clipAction(gltf.animations[0]);
    const RunAction = mixer.clipAction(gltf.animations[1]);
    const WalkAction = mixer.clipAction(gltf.animations[3]);
    IdleAction.play();
    RunAction.play();
    WalkAction.play();
    // 跑步和走路动画对人影响程度为0，人处于休闲状态
    IdleAction.weight = 1.0;
    RunAction.weight = 0.0;
    WalkAction.weight = 0.0;

    let ActionState = IdleAction;//标记当前处于播放状态的动画动作对象

    document.getElementById('Idle').style.backgroundColor = 'blue';
    // 通过UI按钮控制，切换动画运动状态
    document.getElementById('Idle').addEventListener('click', function () {
        ActionState.weight = 0.0;//播放状态动画权重设置为0
        IdleAction.weight = 1.0;
        ActionState = IdleAction;
        this.style.backgroundColor = 'blue'; // 设置为蓝色背景
        document.getElementById('Run').style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        document.getElementById('Walk').style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
    })
    document.getElementById('Run').addEventListener('click', function () {
        ActionState.weight = 0.0;//播放状态动画权重设置为0
        RunAction.weight = 1.0;
        ActionState = RunAction;
        this.style.backgroundColor = 'blue'; // 设置为蓝色背景
        document.getElementById('Idle').style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        document.getElementById('Walk').style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
    })

    document.getElementById('Walk').addEventListener('click', function () {
        ActionState.weight = 0.0;//播放状态动画权重设置为0
        WalkAction.weight = 1.0;
        ActionState = WalkAction;
        this.style.backgroundColor = 'blue'; // 设置为蓝色背景
        document.getElementById('Run').style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        document.getElementById('Idle').style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
    })

    const clock = new THREE.Clock();

    function loop() {
        requestAnimationFrame(loop);
        const frameT = clock.getDelta();
        // 更新播放器相关的时间
        mixer.update(frameT);
    }
    loop();
})


export default model;