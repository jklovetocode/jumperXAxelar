import Image from "next/image";
import { useEffect, useState } from "react";
import anime from "animejs";
import NormButton from "../components/common/NormButton";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Toast from "awesome-toast-component";
export default function () {
  let tst = new Toast(`Temporary Unavaiable`, {
    timeout: 5000,
    position: "center",
  });
  let [star, setStar] = useState([] as number[]);
  useEffect(() => {
    for (let i = 0; i < 50; i++) {
      star.push(i);
    }
    setStar([...star]);
    anime({
      targets: [document.getElementById("mug")],
      opacity: [0.4, 0.6, 0.4, 0.6, 0.4, 0.6, 0.4, 0.6, 0.4, 0.6, 0.4, 1],
      easings: "easeInOutExpo",
      duration: 750,
    });
    anime({
      targets: [document.getElementById("merch-sold")],
      innerHTML: [`0`, `420`, "1,244"],
      easings: "easeInOutExpo",
      round: 1,
      duration: 1000,
      delay: 750,
    });
  }, []);
  return (
    <div className="relavtive h-full w-full max-h-full max-w-full overflow-hidden">
      <div className=" z-[5] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-y-[30px]">
        <Image
          id="basket"
          alt=""
          src={"/product/bask.png"}
          width={120}
          height={120}
          style={{ height: "auto", width: "auto" }}
        />

        <Carousel
          showStatus={false}
          autoPlay
          infiniteLoop
          swipeable
          emulateTouch
          interval={6000}
        >
          <div>
            <Image
              id="mug"
              alt=""
              src={"/product/mug.png"}
              width={350}
              height={80}
              priority={true}
              style={{ height: "auto", width: "auto" }}
            />
            <p className="legend">1st Edition Mug</p>
          </div>
          <div>
            <Image
              id="stackshirt"
              alt=""
              src={"/product/stackshirt.png"}
              width={350}
              height={80}
              priority={true}
              style={{
                height: "auto",
                width: "auto",
                marginTop: 100,
              }}
            />
            <p className="legend">1st Edition T-Shirt - Complete Set</p>
          </div>
          <div>
            <Image
              id="blueshirt"
              alt=""
              src={"/product/blueshirt.png"}
              width={350}
              height={80}
              priority={true}
              style={{ height: "auto", width: "auto" }}
            />
            <p className="legend">1st Edition T-Shirt - Blue</p>
          </div>

          <div>
            <Image
              id="blackshirt"
              alt=""
              src={"/product/blackshirt.png"}
              width={350}
              height={80}
              priority={true}
              style={{ height: "auto", width: "auto" }}
            />
            <p className="legend">1st Edition T-Shirt - Black</p>
          </div>
          <div>
            <Image
              id="redshirt"
              alt=""
              src={"/product/redshirt.png"}
              width={350}
              height={80}
              priority={true}
              style={{ height: "auto", width: "auto" }}
            />
            <p className="legend">1st Edition T-Shirt - Red</p>
          </div>
          <div>
            <Image
              id="whiteshirt"
              alt=""
              src={"/product/whiteshirt.png"}
              width={350}
              height={80}
              priority={true}
              style={{ height: "auto", width: "auto" }}
            />
            <p className="legend">1st Edition T-Shirt - White</p>
          </div>
        </Carousel>
        <div className=" flex gap-[10px] text-2xl font-semibold  ">
          <span id="merch-sold"></span>
          <span>Jumper Merch has been sold.</span>
        </div>
        <div className=" flex gap-x-[20px] text-lg">
          <NormButton label="Promotion Code" />
          <NormButton label="Shipping" />
        </div>
        <div className=" flex gap-x-[20px] justify-center items-center">
          <div>
            <Image
              alt=""
              src={"/cdao.png"}
              width={100}
              height={0}
              style={{ height: "auto", width: 160 }}
              className="aspect-auto"
            />
          </div>
          <div>
            <Image
              alt=""
              src={"/axelar.png"}
              width={80}
              height={0}
              style={{ height: "auto", width: 100 }}
              className=" bg-white/100  rounded-lg"
            />
          </div>
        </div>
      </div>
      <div id="scene" className=" absolute left-0 top-0 h-full w-full z-[0]">
        {star.map((x, y) => {
          return <div className="star" key={`${x}-${y}`}></div>;
        })}
      </div>
    </div>
  );
}
