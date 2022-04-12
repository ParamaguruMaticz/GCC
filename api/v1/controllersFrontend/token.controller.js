import e from 'express';
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose';
const FatherDb = require(path.resolve('./models/father'));
const async = require("async");
const ObjectId = mongoose.Types.ObjectId;
const Config = require(path.resolve('./config/config')).default;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath)
var compress_images = require('compress-images');
const sharp = require("sharp");
const gify = require("gify");
const https = require('https');
const request = require('request');

const Moralis = require('moralis/node');
const fetch = require('node-fetch');
var Url = require('url')
var util = require('util');
var exec = require('child_process').exec
// ipfs
import ipfsClient, { CID } from 'ipfs-http-client';
import { config } from 'dotenv';
//////////////console.log("SasASasaSasS", Config.ipfskey, Config.ipfspass)
// const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https', method:'POST',auth:'1wTkMQG2WBoQZCCrSiCSRo7FrbZ:315050ed68b62693df30cf1648664ed6' });
const ipfs = ipfsClient({ url: 'https://ipfs.infura.io:5001/api/v0', auth: `${Config.ipfskey}:${Config.ipfspass}` });


let AllowedUploadFormat = /\.(png|PNG|gif|WEBP|webp|mpeg|mp4|mp3|video|audio)$/;

export const getNftMetadata = async (req, res) => {

    var noofNFT = req.body;
    console.log("Get From ", noofNFT)
    var count = await FatherDb.find({ type: noofNFT.Type, status: "pending" }).limit(Number(noofNFT.NFTCounts));
    var tokenid = [];
    var ipfsmeta = [];
    console.log("Datas from db",count.length)
    if (count && count.length) {
        count.map(async(data) => {
            var restult = {}
            var command = 'curl -X POST -F file=@public/' + noofNFT.Type + '/' + data.image + ' -u "22ulneb2ed4SWxHzQf8KQYKrlrW:5da2f431a49171b65b9c4e8b63411d16" "https://ipfs.infura.io:5001/api/v0/add"'
            var child = exec(command, async function (error, stdout, stderr) {
                if (error !== null) {
                    console.log('exec error: ipfs' + error);
                }
                if (stdout) {
                    
                    restult = JSON.parse(stdout)
                    console.log("Datas from db",restult)
                    var newmetadata = {
                        name: data.tokenName,
                        image: "https://ipfs.io/ipfs/" + restult.Hash,
                        description: "Galactic Cats NFT",
                    }
                    const filess = { path: 'Cats', content: Buffer.from(JSON.stringify(newmetadata)) }
                    const filessAdd = await ipfs.add(filess)
                    var ipfsmetadata = filessAdd.cid.string;
                    ipfsmeta.push(ipfsmetadata)
                    tokenid.push(data._id)
                    console.log("Metas",ipfsmetadata)
                    if (ipfsmeta.length == count.length) {
                        res.json({ tokenIDs:tokenid, ipfsMetas: ipfsmeta, Message: "success" })
                    }
                }
            })
        })
        
    }
    

}
export const updateFatherNFT = async (req, res) => {
    console.log("Update Father NFT", req.body)
    var updatedatas = await FatherDb.update(
        {
            "_id": { $in: req.body.id }
        },
        {
            $set: { "status": "minted" }
        },
        {
            "multi": true,
            "upsert": false
        })
    if (updatedatas.nModified == req.body.id.length) {
        res.json({ Message: "Update success" })
    }
}
export const IMG_UPLOAD = async (req, res) => {
    try {
        console.log("Image Upload path", req.body)
        var imgsource = Object.values(req.files);
        var count = await FatherDb.find({ "type": req.body.Type }).count();
        imgsource.map(async (file) => {
            count = count + 1;
            console.log("Count", count)
            var imgname = req.body.Type + "#" + count;
            var UploadFullPath = "public/" + req.body.Type + "/" + imgname + ".png";
            await fs.mkdir('public/' + req.body.Type + '/', { recursive: true }, async function (err) {
                
                if (err) return;
                file.mv(UploadFullPath, async function (err) {
                    if (err) return;
                    else{
                        var fatherdata = new FatherDb({
                            image: imgname + ".png",
                            tokenName: imgname,
                            status: "pending",
                            type: req.body.Type
                        })
                        await fatherdata.save();
                    }
                });
                

            });
        })
        res.json({ Message: "Image Upload success" })
    }
    catch (e) {
        console.log("Catch block running", e)
    }
}