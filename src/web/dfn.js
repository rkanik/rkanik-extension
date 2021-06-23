
export default {
    init() {
        let mobile = document.querySelector('input[name="mobile"]')
        let password = document.querySelector('input[name="password"]')

        let submitBtn = document.querySelector('button[type="submit"]')
        let signin = submitBtn.innerText === 'Sign in' ? submitBtn : null

        if (mobile && password && signin) {
            mobile.value = '01703577953'
            password.value = 'cHOKOLET_ANIK'
            signin.click()
        }
    }
}