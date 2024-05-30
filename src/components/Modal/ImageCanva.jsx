import { MdOutlineClose } from "react-icons/md";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import frame from '../../assets/three.obj';
import { Scene } from "three";

function ImageCanva({ open, onClose }) {
    
    // const img = `<img src={"https://waras-squad.nos.wjv-1.neo.id/2024-05-09T07:45:50.742Z-2024-02-26_001_018-TotalJaw1.obj"} alt="" />`
    const loader = new OBJLoader();
    
    loader.load(
        "https://waras-squad.nos.wjv-1.neo.id/2024-05-09T07:45:50.742Z-2024-02-26_001_018-TotalJaw1.obj",
        function (object) {

            Scene.add(object);

        },
        // called when loading is in progresses
        function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function (error) {
            console.log(error);
        });

    // obj.traverse((child) => {
    //     if (child.isMesh) {
    //         child.material.needsUpdate = true;
    //         child.geometry.center();
    //     }
    // });

    return (
        <div className={`fixed ${open ? "" : "hidden"} z-[1000] inset-0 p-5 bg-gray-600 bg-opacity-50 overflow-y-auto w-full`}>
            <div className="relative mx-auto p-5 border w-[90%] max-w-[550px] h-[90vh] shadow-lg md:max-w-[600px] lg:max-w-[1000px] rounded-md bg-white">
                <div className="grid grid-cols-3 justify-center">
                    <div />
                    <div>
                        <p className="text-center font-semibold text-nowrap">Gambar</p>
                    </div>
                    <div className="flex justify-end">
                        <MdOutlineClose size={20} color="black" onClick={onClose} />
                    </div>
                </div>

                <Canvas className="cursor-pointer" frameloop="demand">
                    <Suspense fallback={null}>
                        <ambientLight intensity={1} />
                        {
                            loader ? <primitive object={loader} scale={0.1} /> : null
                        }
                        <OrbitControls />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}

export default ImageCanva;
