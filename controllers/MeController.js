const User = require('../models/user.model')
const Song = require('../models/song.model')

class MeController {
    // giả sử ở middleware trước, đã verify ra user thuonnguyen.it78
    // shirt + alt + up/down

    async getFavoriteAll(req, res, next) {
        // 0. declare something
        let result = {data: []}
        // 1. get user from middleware before
        const user =  await User.findById('5ffbe15bf74bd3af9e4972b5') //req.user
        // 2. get all list songs from listFavoriteSongs and return

        try {
            const listFavoriteSongs = await Song.find({_id: { $in : user.listFavoriteSongs} } )
            result.data = listFavoriteSongs
            res.json(result)

        } catch (error) {
            res.json(result)    
           
        }

    }

    async postFavoriteOne(req, res, next) {
        const { songID } = req.body

        if(typeof songID !== 'string') {
            res.json({data: false})
            return;
        } 


        const user =  await User.findById('5ffbe15bf74bd3af9e4972b5') //req.user
        
        user.listFavoriteSongs.push(songID)

        try {
            await user.save()
            res.json({data: true})
        } catch (error) {
            res.json({data: false})
        }
        

    }
    // delete song from list favorite
    async patchFavoriteOne(req, res, next) {
        const { songID } = req.body

        const user =  await User.findById('5ffbe15bf74bd3af9e4972b5') //req.user

        user.listFavoriteSongs = user.listFavoriteSongs.filter((id) => {
            return id !== songID
        })

        try {
            await user.save()
            res.json({data: true})
        } catch (error) {
            res.json({data: false})
        }

    }
}

module.exports = new MeController()