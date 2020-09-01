export default async () => {
    console.clear()
    console.log(":: Dantownms ::");

    document.body.id = "RK_HOTFIX"


    let alert = document.querySelector('.alert.alert-info')
    console.log('Alert', alert);
    if (alert) alert.parentElement.innerHTML = `
        <div class="welcome-card">
            <div class="welcome-card--content">
                <h4 class="welcome-card--heading">Hi Simeon,</h4>
                <p class="welcome-card--desc">Welcome to DANTOWN DASHBOARD</p>
                <p class="welcome-card--desc">Will you like us to show around the dashboard?</p>
            </div>
            <div class="welcome-card--actions">
                <span>
                    <button class="btn btn-pill btn-yellow">YES! Please</button>
                    <button class="btn btn-pill btn-white">Maybe Later</button>
                </span>
            </div>
            <img
                class="welcome-card--close"
                src="https://i.ibb.co/wphHqNB/CLOSE-WHITE-2-X.png"
                alt="Close Button"
            />
        </div>
    `
}