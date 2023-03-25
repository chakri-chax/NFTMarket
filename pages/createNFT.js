// import React from 'react'

// const createNFT = () => {
//   return (
//     <div>createNFT</div>
//   )
// }
// //hello

// export default createNFT

// // PROJECT ID
// // 2NVA10vVMJoxLbfXSwaPwFYfHFy
// // API KEY SECRET
// // bff39e70059d3785c0d7eff311158544





import {useState} from 'react'
import {ethers} from 'ethers'
import {create as ipfsHttpClient} from 'ipfs-http-client'
import {useRouter} from 'next/router'
import Web3Modal from'web3modal'

import { nftaddress,nftmarketaddress} from "../config"

import NFT from "../artifacts/contracts/NFT.sol/NFT.json"
import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json"



//*******************From infura we get project id and secret code**************

const {create} =require('ipfs-http-client')
const projectId="2KuvAYJu0kvpHCT4uV9xdtnuDaw"
const projectSecret="eeab44c90ec60e9d02f9b9d7434a973b"

// ***************** authentication from infura *******************
const auth= "Basic " + Buffer.from(projectId + ":" +projectSecret).toString("base64");
const client =create({
  host: "ipfs.infura.io",
  port:5001,
  protocol:"https",
  headers:{
  authorization:auth
  },
});


export default function CreateItem(){

  //********* from user response like url by IPFS and details

  const [fileurl,setFileUrl] = useState(null)
  const [formInput,updateFormInput]=useState({price:"",name:"",description:""})


  //************ for getting and setting values or components from one page to another

  const router=useRouter()
  
  async function onChange(e){
    const file=e.target.files[0]
    try{
      const added=await client.add(
        file,{
          progress:(prog)=>console.log(`received:${prog}`) //how much it uploaded
        }
      )
      const url=`https://ipfs.infura.io:5001/${added.path}`
      setFileUrl(url) //updating state
    }catch(error){
      console.log("error uploading file, please try again:" ,error)
    }
  }
}
 
