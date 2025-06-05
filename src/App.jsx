import 'remixicon/fonts/remixicon.css'
import React, { useState } from 'react'
import "./index.css"
import { useGSAP } from '@gsap/react';
import gsap from "gsap"
import ChatResponse from './Components/ChatResponse';
import ChatInput from "./Components/ChatInput";
 

function App() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleQuestionSubmit = async (question) => {
        setLoading(true);
        setResponse(null);
        try {
        const res = await fetch('https://ask-daddy.onrender.com/ai/qna/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
        });


        if (!res.ok) throw new Error("Server error");

        const data = await res.text();
        setResponse(data);
        setTimeout(() => {
            document
              .querySelector('.response-container')
              ?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } catch (error) {
        alert("Failed to get response: " + error.message);
        } finally {
        setLoading(false);
        }
    };
    
    let [showContent,setShowContent]=useState(false)
    useGSAP(()=>{
        const tl = gsap.timeline();

        tl.to(".ruined-mask-group",{
            rotate: 20,
            duration:2,
            ease:"Power4.easeInOut",
            transformOrigin: "50% 50%",
        })
        .to(".ruined-mask-group",{
            scale:10,
            duration:2,
            delay:-1.8,
            ease:"Expo.easeInOut",
            transformOrigin: "50% 50%",
            opacity: 0,
            onUpdate: function(){
                if(this.progress()>=.5){
                document.querySelector(".svg").style.display = "none";
                    setShowContent(true);
                    this.kill();
                }
            }
        })
    }) 

     useGSAP(() => {
         if (!showContent) return;

        gsap.to(".main", {
        scale: 1,
        rotate: 0,
        duration: 2,
        delay: "-1",
        ease: "Expo.easeInOut",
        });

        gsap.to(".bg", {
        scale: 1.1,
        rotate: 0,
        duration: 2,
        delay: "-.8",
        ease: "Expo.easeInOut",
        });

        gsap.to(".model", {
        scale: 1.2,
        x: "-5%",
        bottom: "-25%",
        rotate: 0,
        duration: 2,
        delay: "-1",
        ease: "Expo.easeInOut",
        });

        gsap.to(".text", {
        scale: 1,
        rotate: 0,
        duration: 2,
        delay: "-.8",
        ease: "Expo.easeInOut",
        });

        const main = document.querySelector(".main");
        main?.addEventListener("mousemove",function(e){
            const xMove = (e.clientX / window.innerWidth-0.5)*40;
            gsap.to(".imagesdiv .text", {
            x: `${xMove * 0.4}%`,
            });
            gsap.to(".bg", {
                x: xMove * 1.7,
            });
        })

    },[showContent])
  return (
    <>  
    <div className='noselect'>
    <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="ruined-mask-group">
                <text
                x="50%"
                y="50%"
                fontSize="250"
                textAnchor="middle"
                fill="white"
                dominantBaseline="middle"
                fontFamily="heorot"
                >
                D
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
    {showContent && <div className="main w-full">
        <div className="landing w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full px-2 py-2 bg-gradient-to-t from-transparent to-black " >
                <div className="Logo">
                    <img src="./logo1.png" alt="" className="h-30 w-auto mt-[-8px]" />
                </div>
            </div>           
            <div className=" imagesdiv overflow-hidden relative w-full h-screen ">
                <img className=" absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover" src="./bg.png" alt="" />
                <div className="text-white absolute flex flex-col gap-[.2rem] top-0 left-1/2 -translate-x-1/4 ">
                    <h1 className=" text text-9xl leading-none -ml-80">The</h1>
                    <h1 className="text text-9xl leading-none -ml-40">almighty</h1>
                    <h1 className="text text-9xl leading-none -ml-80">daddy</h1>
                </div>text 
                <img className="absolute model -bottom-[150%] left-1/2 -translate-x-1/2  scale-[5] w-[700px] rotate-[-20deg]" src="./model.png" alt="" />
            </div>  
            <div className="btmbar absolute bottom-0 left-0 w-full py-10 px-10 bg-gradient-to-t from-black to-transparent ">
                <div className="flex items-center justify-between w-full px-10">
                    <div className="flex items-center gap-2 ml-0 pl-0">
                        <i className="text-4xl text-emerald-100 ri-arrow-down-line"></i>
                        <h3 className="text-emerald-100 text-xl font-[Helvetica_Now_Display]">Scroll Down</h3>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
                        <span className="text-amber-50 text-5xl   font-[seraphon] whitespace-pre-line">
                        "In the silence of ruin,<br /> only Daddy whispers truth."
                        </span>
                    </div>
            </div>
            </div>
            <div className="w-full h-screen leading-none font-[Seraphon] flex text-amber-100 items-center justify-center bg-black">
                <div className='cntnr flex w-full px-10 h-[80%] '>
                    <div className="chatbotimg w-1/2 ">
                    <img 
                        className='mt-8 scale-[1.4] ml-0'  
                        src="./chatbotimg.png" 
                        alt="" 
                        style={{ pointerEvents: 'none' }} 
                        />
                    </div>
                    <div className='chatbox w-[30%]'>
                        <h1 className='text-9xl leading-none'>Ask Daddy,</h1>
                        <h1 className='text-9xl mt-[-1rem] sm:mt-[-1.5rem] leading-none'> &nbsp; &nbsp; &nbsp;He Knows</h1>

                        <p className='text-xl text-amber-50 font-[helvetica_new_display]'>
                            Ask Daddy is your go-to source for raw, unapologetic wisdom. Straightforward, bold, and always on point, 
                            it delivers answers with attitude. In a world full of noise and confusion, Ask Daddy
                             cuts through the chaos with clarity and power. When you need truth—just ask. He knows. Always.
                        </p>
                        <div>
                         <ChatInput onSubmit={handleQuestionSubmit} />
                         
                        </div>
                    </div>
                </div>
                
            </div>
            {response && (
  <div className="response-container w-full min-h-screen px-10 py-20 bg-black text-white flex justify-center items-start">
    <div className="card w-full max-w-8xl rounded-2xl p-8 shadow-[0_0_60px_#2bccb444] bg-gradient-to-b from-[#141414] via-[#1b1b1b] to-[#000000] border border-[#2bccb4]/20">
      <ChatResponse response={response} />
    </div>
  </div>
)}

        </div>     
    </div> 
    }
    </div>
    </>
  );
  
}

export default App
