import { sleep } from '../helpers/helpers'
const init = () => {

    console.log('Facebook init');

    // let headerIcons = document.querySelectorAll('._4kny')
    // console.log(headerIcons);
    // headerIcons.forEach(icon => {
    //     icon.active()
    // })
}

const $ = {
    all(selector) {
        return Array.from(document.querySelectorAll(selector))
    }
}

var posts = []
//var lastPostIndex = 0

const autoLike = async () => {

    let postEls = $.all('.w_5t662t9pt')
    //console.log('Auto Like', posts, lastPostIndex, postEls);
    //let lastIndex = postEls.length - 1

    //postEls = postEls.slice(lastPostIndex)
    //console.log('After slice', postEls);
    //lastPostIndex = lastIndex

    if (posts.length) {
        let lastPost = posts.pop()
        let lastPostElIndex = postEls.findIndex(el => el.id.includes(lastPost.id))
        console.log(posts, postEls, lastPostElIndex);
        postEls = postEls.splice(lastPostElIndex)
    }

    for (let postEl of postEls) {

        // Scrolling to post
        //postEl.scrollIntoView({ behavior: 'smooth' })

        // Post ID
        let id = postEl.id.split('_').pop()
        if (!id) continue

        let post = posts.some(p => p.id === id)
        if (post) {
            console.log('Existed post ', post);
            if (!post.isLiked) {
                let like = postEl.querySelector('a._6a-y._3l2t._18vj')
                like && like.click()
                posts.forEach(p => {
                    if (p.id === id) {
                        p.isLiked = true
                    }
                })
            }
            continue
        }

        // Like button
        let like = postEl.querySelector('a._6a-y._3l2t._18vj')
        if (like) {

            like.scrollIntoView()
            await sleep(500)
            window.scroll(0, window.pageYOffset - 200)
            await sleep(1000)

            let isLiked = like.getAttribute('aria-label') === 'Remove Like' ? true : false
            !isLiked && like.click()

            console.log('is Liked', isLiked);
        }
        post = { id, isLiked: true }
        if (!posts.some(p => p.id === post.id)) {
            posts.push(post)
        }

        await sleep(3, 's')
    }
    autoLike()
}

export default async () => {
    console.log('Facebook init');


    await sleep(5, 's')

    //autoLike()

    //document.querySelectorAll('.w_5t662t9pt')
    //let like = post.querySelector('a._6a-y._3l2t._18vj')
    // like.getAttribute('aria-label') Like Remove Like

    // let scrolled = 0
    // setTimeout(() => {
    //     setInterval(() => {
    //         scrolled += 100
    //         window.scroll({
    //             top: scrolled,
    //             behavior: 'smooth'
    //         });
    //     }, 1000);
    // }, 5000);
}