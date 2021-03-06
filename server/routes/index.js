const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { v4 : uuidv4 } = require('uuid');
const { verifyToken } = require('./middlewares');

const {
    User,
    Novel,
    Chapter,
    OwnedContent,
    UserComment,
    sequelize
} = require('../models');
const CreateQuery = require('../testQueries.js');

router.get('/test', verifyToken, async(req, res, next) => {
    res.send(`test success. id : ${req.body.userId}`);
})

//소설 요약정보 응답하기
router.get('/info/novel/:novelId', async (req, res, next) => {
    const novelId = req.params.novelId;
    console.log(`here, novelId : ${novelId}`);
    try {
        const novelInfo = await Novel.findOne({
            include: [{
                model: Chapter,
                as: 'chapters'
            }],
            where: {
                id: novelId,
            }
        });

        res.send(novelInfo);

    } catch (err) {
        console.log(err);
    }
});

// 직접 쓴 소설 가져오기
router.get('/written/novel', async (req, res, next) => {
    // 임시로 유저아이디는 req.body에서 가져옴.
    const userId = req.body.userId;
    try {
        const writtenNovels = await Novel.findAll({
            where: {
                User_id: userId,
            }
        });

        res.send({
            "novels": writtenNovels
        });

    } catch (err) {
        console.log(err);
    }
});

// 구매한 소설 가져오기
router.get('/purchased/novel', async (req, res, next) => {
    // 임시로 유저아이디는 req.body에서 가져옴.
    const userId = req.body.userId;
    try {
        //sequelize 방식이 복잡하여 일단 raw query 사용
        const query = `
        select *
        from novel, ownedContent
        where ownedContent.type = "novel"
        and ownedContent.id = novel.id 
        and ownedContent.User_id = "${userId}"
        and own = 0;
        `;

        const result = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
        res.send({
            "novels": result
        });

    } catch (err) {
        console.log(err);
    }
});
//---------------------------------------------------------------------------------------------
// 챕터의 content file 리턴
router.get('/content/novel/:novelId/chapter/:chapterId', async (req, res, next) => {
    // 임시로 유저아이디는 req.body에서 가져옴.
    const novelId = req.params.novelId;
    const chapterId = req.params.chapterId;
    console.log(novelId, chapterId);
    try {
        const chapterFileName = await Chapter.findAll({
            attributes: ['chapterFileName'],
            where: {
                chapterID: chapterId,
                Novel_novelID: novelId
            }
        });
        var _chapterFileName = chapterFileName[0].dataValues["chapterFileName"];
        fs.readFile(`./chapters/${_chapterFileName}`, "utf8", (err, contentFile) => {
            try {
                res.send(contentFile);
            } catch (err) {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }
});

router.post('/comment/user', verifyToken, async (req, res, next) => {
    const { chapterId, novelId, userId, rating, content } = req.body;
    try {
        await UserComment.create({
            Chapter_id : chapterId,
            Chapter_Novel_id : novelId,
            userId,
            rating,
            content
        });

    } catch(err) {
        console.error(err);
        next(err);
    }
    res.end();
});

router.get('/comment/user/:novelId/:chapterId', async (req, res, next) => {
    const { novelId, chapterId } = req.params;
    try {
        // await UserComment.findAll({
        //     include: {
        //         model: User,
        //     },
        //     attributes: [['id', 'commentId'], 'userId', 'rating', 'content'],
        //     where: {
        //         Chapter_Novel_id: novelId,
        //         Chapter_id: chapterId,
        //     }
        // }).then((comments) =>  {
        //     res.json(comments);
        // });
        const query = `
        select User.id as commentId, nickname, rating, content
        from User, UserComment
        where User.id = UserComment.userId 
        and Chapter_id = ${chapterId}
        and Chapter_Novel_id = ${novelId};
        `
        await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        }).then(result => {
            res.json({'comments' : result});
        });
    } catch(err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;