import express from 'express';
const router = express();

import * as TokenCtrl from '../controllersFrontend/token.controller';
router.route('/img/upload').post(TokenCtrl.IMG_UPLOAD)
router.route('/getNftMetadata').post(TokenCtrl.getNftMetadata)
router.route('/updatefathernft').post(TokenCtrl.updateFatherNFT)





export default router;