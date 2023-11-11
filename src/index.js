import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"
import { FlakesTexture } from "three/examples/jsm/textures/FlakesTexture"
import GUI from "lil-gui"


const canvas = document.getElementById("webgl")
const scene = new THREE.Scene()
const size = {
    width: window.outerWidth,
    height: window.outerHeight
}

const gui = new GUI
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100)
camera.position.z = 10
const controls = new OrbitControls(camera, canvas)
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, })
renderer.setPixelRatio(window.devicePixelRatio)
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)
const rgbeLoader = new RGBELoader()

//TEXTURES
let flakesTexture = new FlakesTexture()
let canvasFlaketexture = new THREE.CanvasTexture(flakesTexture);
canvasFlaketexture.wrapS = THREE.RepeatWrapping;
canvasFlaketexture.wrapT = THREE.RepeatWrapping;
canvasFlaketexture.repeat.x = 20;
canvasFlaketexture.repeat.y = 20;

const boxGeo = new THREE.BoxGeometry(5, 5, 5)
const norMat = new THREE.MeshNormalMaterial()
const mesh = new THREE.Mesh(boxGeo, norMat)



//MATERIALS
const material = new THREE.MeshPhysicalMaterial({
    color: 0x111111,
    metalness: 1.0,
    roughness: 0.2,
    envMapIntensity: 10,
    clearcoat: 1.0,
    normalMap: canvasFlaketexture,
    normalScale: new THREE.Vector2(0.15, 0.15),
});

const dial_mat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
const text_mat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide })
const crown_mat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: material.metalness,
    roughness: material.roughness,
    envMapIntensity: material.envMapIntensity,
    clearcoat: material.clearcoat,
    normalMap: canvasFlaketexture,
    normalScale: material.normalScale,
})
const marker_mat = new THREE.MeshBasicMaterial({
    color: 0x111111,

})
const second_mat = new THREE.MeshBasicMaterial({
    color: 0x111111,
})
const glass_mat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 1,
    opacity: 1,
    metalness: 0,
    roughness: 0,
    ior: 1,
    thickness: 2,
    specularIntensity: 1,
    specularColor: 0xffffff,
    envMapIntensity: 1,

})

const helper = new THREE.GridHelper()
// scene.add(helper)

const Hour_Markers_grp = new THREE.Group()
const Minute_Markers_grp = new THREE.Group()
const Second_Markers_grp = new THREE.Group()

gltfLoader.load("./models/gltf/Rollex.glb", (gltf) => {

    let Dial_Text_grp
    let Subdial_Markers_grp
    let Crown_grp
    let Logo_grp
    let Subdial_Hand_grp
    let Subdial_Rings_grp
    let Subdial_Numbers_grp
    let Strap_grp
    let Hands_grp
    let Markers_grp
    let Bezel_grp
    let Crystal_grp
    let Dial_grp
    let Lugs_grp


    scene.add(gltf.scene)

    controls.target
    gltf.scene.traverse(item => {

        if (item.name === "Dial_Text_grp") {

            Dial_Text_grp = item

        }
        if (item.name === "Subdial_Markers_grp") {
            Subdial_Markers_grp = item

        }
        if (item.name === "Crown_grp") {
            Crown_grp = item

        }
        if (item.name === "Logo_grp") {
            Logo_grp = item

        }
        if (item.name === "Subdial_Hand_grp") {

            Subdial_Hand_grp = item

        }
        if (item.name === "Subdial_Rings_grp") {
            Subdial_Rings_grp = item

        }
        if (item.name === "Subdial_Numbers_grp") {
            Subdial_Numbers_grp = item

        }
        if (item.name === "Strap_grp") {
            Strap_grp = item

        }
        if (item.name === "Hands_grp") {
            Hands_grp = item

        }
        if (item.name === "Markers_grp") {
            Markers_grp = item

        }
        if (item.name === "Bezel_grp") {
            Bezel_grp = item

        }
        if (item.name === "Crystal_grp") {
            Crystal_grp = item

        }
        if (item.name === "Dial_grp") {
            Dial_grp = item

        }
        if (item.name === "Lugs_grp") {
            Lugs_grp = item

        }
    })


    Strap_grp.traverse(item => {
        if (item.isMesh) {
            item.material = material
        }
    })

    Lugs_grp.traverse(item => {
        if (item.isMesh) {
            item.material = material
        }
    })
    Crown_grp.traverse(item => {
        if (item.isMesh) {
            item.material = material
        }
    })
    Logo_grp.traverse(item => {
        if (item.isMesh) {
            item.material = material
        }
    })
    Dial_grp.traverse(item => {
        if (item.isMesh) {
            item.material = dial_mat
        }
    })
    Crown_grp.traverse(item => {
        if (item.isMesh) {
            item.material = material
        }
    })
    Bezel_grp.traverse(item => {
        if (item.isMesh && item.name.includes("LED")) {
            item.material = dial_mat
        } else {
            item.material = material
        }
    })
    Lugs_grp.traverse(item => {
        if (item.isMesh) {
            item.material = material
        }
    })

    Markers_grp.traverse(item => {
        if (item.isMesh && item.name === "Hour_MarkersPIV") {
            mesh.position.copy(item.position)
            item.position.set(0, 0, 0)
            item.material = marker_mat
            // scene.add(mesh)
            Hour_Markers_grp.add(item)
        } else if (item.isMesh && item.name === "Second_Markers1PIV") {

            mesh.position.copy(item.position)
            item.position.set(0, 0, 0)
            item.material = second_mat
            // scene.add(mesh)
            Second_Markers_grp.add(item)
        } else if (item.isMesh && item.name === "Minute_MarkersPIV") {
            mesh.position.copy(item.position)
            item.position.set(0, 0, 0)
            // item.material = second_mat
            // scene.add(mesh)
            Minute_Markers_grp.add(item)
        }

    })

    Dial_Text_grp.traverse(item => {
        if (item.isMesh) {
            item.material = text_mat
        }
    })

    Crown_grp.traverse(item => {
        if (item.isMesh) {
            item.material = crown_mat
        }
    })

    Crystal_grp.traverse(item => {
        if (item.isMesh) {
            item.material = glass_mat
        }
    })
    scene.add(
        Dial_Text_grp,
        Subdial_Markers_grp,
        Crown_grp,
        Logo_grp,
        Subdial_Hand_grp,
        Subdial_Rings_grp,
        Subdial_Numbers_grp,
        Strap_grp,
        Hands_grp,
        Markers_grp,
        Bezel_grp,
        Crystal_grp,
        Dial_grp,
        Lugs_grp,
        Hour_Markers_grp,
        Second_Markers_grp,
        Minute_Markers_grp
    )
})


const speckleFinish = () => {
    material.normalScale.x = 0.3
    material.normalScale.y = 0.3
    material.clearcoat = 1
    canvasFlaketexture.repeat.x = 50
    canvasFlaketexture.repeat.y = 50
    material.roughness = 0.2
    material.metalness = 1.0
    material.needsUpdate = true
    renderer.toneMapping = THREE.ReinhardToneMapping
    canvasFlaketexture.needsUpdate = true
    crown_mat.needsUpdate = true
}

const polishFinish = () => {
    material.normalScale.x = 0
    material.normalScale.y = 0
    material.clearcoat = 1
    canvasFlaketexture.repeat.x = 0
    canvasFlaketexture.repeat.y = 0
    material.roughness = 0
    renderer.toneMapping = THREE.ReinhardToneMapping
    material.metalness = 1.0
    material.needsUpdate = true
    canvasFlaketexture.needsUpdate = true
    crown_mat.needsUpdate = true

}

const brushFinish = () => {
    material.normalScale.x = 0.15
    material.normalScale.y = 0.29
    material.clearcoat = 0
    canvasFlaketexture.repeat.x = 5.6
    canvasFlaketexture.repeat.y = 0.1
    material.roughness = .4
    material.metalness = 1.0
    material.needsUpdate = true
    renderer.toneMapping = THREE.ReinhardToneMapping
    crown_mat.needsUpdate = true
    canvasFlaketexture.needsUpdate = true
}

const matteFinish = () => {
    material.normalScale.x = 0
    material.normalScale.y = 0
    material.clearcoat = 0
    canvasFlaketexture.repeat.x = 0
    canvasFlaketexture.repeat.y = 0
    material.roughness = .7
    material.envMapIntensity = 4.4
    material.metalness = 1.0
    material.needsUpdate = true
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.toneMappingExposure = 1.5
    crown_mat.needsUpdate = true
    canvasFlaketexture.needsUpdate = true
}

const debugFunc = {
    speckleFinish, polishFinish, brushFinish, matteFinish
}
// gui.add(canvasFlaketexture.repeat, "x").min(0).max(100).onChange(() => canvasFlaketexture.needsUpdate = true, crown_mat.needsUpdate = true).name("Flakes X")
// gui.add(canvasFlaketexture.repeat, "y").min(0).max(100).onChange(() => canvasFlaketexture.needsUpdate = true, crown_mat.needsUpdate = true).name("Flakes Y")
// gui.add(material.normalScale, "x").min(0).max(1).step(.01).onChange(() => material.needsUpdate = true, crown_mat.needsUpdate = true).name("Normal Scale x")
// gui.add(material.normalScale, "y").min(0).max(1).step(.01).onChange(() => material.needsUpdate = true, crown_mat.needsUpdate = true).name("Normal Scale Y")
gui.add(debugFunc, "speckleFinish").name("Speckle Finish")
gui.add(debugFunc, "polishFinish").name("Polish Finish")
gui.add(debugFunc, "brushFinish").name("Brush Finish")
gui.add(debugFunc, "matteFinish").name("Matte Finish")
gui.add(Hour_Markers_grp, "visible").name("Hour Markers Visibility")
gui.add(Minute_Markers_grp, "visible").name("Minute Markers Visibility")
gui.add(Second_Markers_grp, "visible").name("Second Markers Visibility")
gui.add(glass_mat, "ior").name("Glass IOR").min(0).max(1).step(.01)
gui.add(glass_mat, "thickness").name("Thickness IOR").min(0).max(1).step(.01)
gui.add(glass_mat, "specularIntensity").name("Specular IOR").min(0).max(1).step(.01)

// ENVIRONMENT
rgbeLoader.load('/env/studio_small_07_2k_copy.hdr', (envMap) => {

    envMap.mapping = THREE.EquirectangularReflectionMapping
    material.envMap = envMap
})

//LIGHTS
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff)
scene.add(hemiLight)


const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);

// Add the directional light to the scene
scene.add(dirLight);


// const directionalLightHelper = new THREE.DirectionalLightHelper(dirLight, .5)
// scene.add(directionalLightHelper)
// const ambLight = new THREE.AmbientLight(0xffffff, 5)
// scene.add(ambLight)


// gui.add(material, "clearcoat").min(0).max(1)
// gui.add(material, "envMapIntensity").min(0).max(100)
// gui.add(material, "roughness").min(0).max(1).step(.1)
// gui.add(material, "metalness").min(0).max(1).step(.1)
// gui.add(dirLight, "intensity").min(0).max(10).name("Directional Light Intensity")
// gui.add(ambLight, "intensity").min(0).max(10).name("Ambient Light Intensity")

// gui.add(renderer, 'toneMapping', {
//     No: THREE.NoToneMapping,
//     Linear: THREE.LinearToneMapping,
//     Reinhard: THREE.ReinhardToneMapping,
//     Cineon: THREE.CineonToneMapping,
//     ACESFilmic: THREE.ACESFilmicToneMapping,
// })
gui.addColor(dial_mat, "color").name("Dial Color")
gui.addColor(text_mat, "color").name("Text Color")
gui.addColor(crown_mat, "color").name("Crown Color")
gui.addColor(marker_mat, "color").name("Hour Marker Color")
gui.addColor(second_mat, "color").name("Seconds Marker Color")

// gui.add(renderer, "toneMappingExposure").step(.01).min(0).max(20)
const tick = () => {
    renderer.setSize(size.width, size.height)
    renderer.render(scene, camera)
    // renderer.toneMapping = THREE.ACESFilmicToneMapping
    // scene.background = 0xffffff



    controls.update()
    window.requestAnimationFrame(tick)
}
tick()