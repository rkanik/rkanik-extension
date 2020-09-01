import { sleep, ms } from '../helpers/helpers'
import { FB_SEND_MESSAGE } from '../helpers/defined';

var domLoaded = false
var todos = []
var likeCount = 0
var likeFailCount = 0

window.onload = async () => {
    console.log(':: Window OnLoad ::', todos);

    domLoaded = true
    for (let todo of todos) {
        if (todo.type === FB_SEND_MESSAGE) {
            let res = await sendMessage(todo.message)
            done({ id: todo.id, job: todo.job, res })
        }
    }

};


const $ = {
    all(selector) {
        return Array.from(document.querySelectorAll(selector))
    }
}

var posts = []
//var lastPostIndex = 0

const sendMessage = async message => {
    console.log('SendMessage :: ');
    await sleep(ms.second * 2)

    let inp = document.querySelector("span[data-text]") //br[data-text]
    let br = document.querySelector("br[data-text]")
    let btn = document.querySelector('a[aria-label="Send"]') // Send a Like

    if (br) {
        br.parentElement.innerHTML = '<span data-text="true"></span>'
        inp = document.querySelector("span[data-text]")

        if (inp) {
            inp.inneText = message
            await sleep(50)

            let btn = document.querySelector('a[aria-label="Send"]')
            if (btn) {
                btn.click()
                return { error: false, status: 'success' }
            }
        }
    }
}

const getLikeButton = () => {
    let likes = [...document.querySelectorAll('div[aria-label=Like]')]
    likes = likes.filter(like => like.querySelector('i'))
    return likes.length ? likes[0] : null
}

const autoLike2 = async () => {
    if (likeCount > 50 || likeFailCount > 5) location.reload()
    console.log(`:: AUTO LIKE :: LIKED ${likeCount} :: FAIL ${likeFailCount} ::`);

    let like = getLikeButton()

    if (like) {
        like.scrollIntoView({ behavior: 'smooth' })
        await sleep(1, 's')
        window.scroll({
            left: 0,/* behavior: 'smooth',*/
            top: window.pageYOffset - 200,
        })
        await sleep(1, 's')
        like.click()
        likeCount += 1
        await sleep(500)
    }
    else { likeFailCount += 1 }
    await sleep(2, 's')
    autoLike2()
}

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

    chrome.runtime.onMessage.addListener(async (msg, sender, done) => {
        console.log('On Message :: ', domLoaded);
        if (!domLoaded) {
            todos.push({ msg, sender, done })
            done({ waiting: true })
            return
        }
        if (msg.type === 'AUTO_LIKE') { autoLike2() }
        else if (msg.type === FB_SEND_MESSAGE) {
            let res = await sendMessage(msg.message)
            done({ id: msg.id, job: msg.job, res })
        }
    });

    chrome.runtime.onConnect.addListener(info => {
        console.log(':: onConnected :: ', info);
    })

    await sleep(3, 's')

    //autoLike()
    //autoLike2()

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

class Facebook {

    constructor() {
        // Booleans
        this.domLoaded = false

        // Auto like
        this.alLiked = 0
        this.alFail = 0
        this.alRetry = 0
    }

    init() {

    }

    handleEvents() {

    }

    autoLike() {

    }
}