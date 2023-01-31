import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'

function Home() {
    const [contents,setContents] = useState([])

    useEffect(()=>{
        axios.get("https://strapi.kurage.store/api/webpages/1?populate[content][populate]=*").then((result)=>{
            setContents(result.data.data.attributes.content);
            
        })
    },[])
    return (
        
        <div>
        <NavBar/>
        {console.log(contents,'contents')}
        {(contents)?
             (
                 <>
                 <div className='h-10 bg-blue-600'>
                      <h1 className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white ml-10" >  Knowledge Base </h1>
                 </div>

                {(contents[1]?.media[0]?.type==="image")
                ?
                <div >
                    <img src={contents[1]?.media[0]?.filepath} alt=""/>
                </div>
                : (contents[1]?.media[0]?.type==="video")? <div>
                <video style={{width:"100%",height:"700px",objectFit:"contain"}} src={contents[1]?.media[0]?.filepath} controls playsInline loop muted alt=""/>
                 </div>
                 :""
            }
                <div className='h-64' style={{display:"flex",flexDirection:"column",backgroundColor:contents[0]?.header_background}}>
                    <h2 className='text-5xl mt-8 ml-8 ' style={{order:contents[0]?.title_position,color:contents[0]?.title_color,fontFamily:"monospace"}}>{contents[0]?.title}</h2>
                    <p className='ml-8 mt-5 text-base' style={{order:contents[0]?.description_position,color:contents[0]?.description_color,fontFamily:"monospace"}}>{contents[0]?.description}</p>
                    <span className='ml-8 mt-5  text-base' style={{order:contents[0]?.author_position,color:contents[0]?.author_font_color}}>Written by <span className='font-bold'>  {contents[0]?.author} </span></span>
                </div>
                </>
            ) :""
        }
        
        
        
    </div>
  )
}

export default Home