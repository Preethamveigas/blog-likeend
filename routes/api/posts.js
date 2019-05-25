const express = require("express");
const router = express.Router();

//validator post input

//Post model
const Post = require("../../models/Post");
//User model
const User = require("../../models/User");

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Public

router.post("/like/:id", (req, res) => {
  console.log("adding like", req.body);

  User.findOne({
    _id: req.body.usrId
  })
    .then(usr => {
      Post.findOne({
        _id: String(req.params.id)
      }).then(post => {
        const UserLikes = post.like.filter(usrlike => {
          return String(usrlike.user).trim() === String(usr._id).trim();
        });
        console.log(UserLikes);
        console.log(
          post.like.filter(usrlike => {
            return String(usrlike.user).trim() === String(usr._id).trim();
            // console.log(
            //   String(usrlike.user).trim(),
            //   "",
            //   String(usr._id).trim()
            // );
          })
        );
        if (UserLikes.length > 0) {
          return res.status(200).json({
            like: "user already liked"
          });
        }
        post.like.unshift({
          user: usr._id
        });
        post.save().then(post => res.status(200).json(post));
      });
    })
    .catch(err =>
      res.status(400).json({
        post: "there is a problem in posting a like"
      })
    );
});

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Public
router.post("/unlike/:id", (req, res) => {
  User.findOne({
    _id: String(req.body.usrId).trim()
  }).then(usr => {
    Post.findById(req.params.id)
      .then(post => {
        const likeUsr = post.like.filter(like => {
          return String(like.user).trim() === String(usr._id).trim();
        });

        if (likeUsr.length < 1) {
          return res.status(400).json({
            notliked: "You have not yet liked this post"
          });
        }

        const datalike = post.like.map((li, i) => {
          if (String(li.user).trim() === String(usr._id).trim()) {
            post.like.splice(i, 1);
            post.save().then(post => res.json(post));
          }
        });

        return false;

        // remove the index for the post like
        // const removeIndex = post.likes
        //   .map(item => {
        //     console.log("mapping");
        //     item.user.toString();
        //   })
        //   .indexOf(req.body.usrId);

        // Splice ou  t of array
        // post.likes.splice(removeIndex, 1);
      })
      .catch(err =>
        res.status(404).json({
          postnotfound: "No post found"
        })
      );
  });
});

module.exports = router;
