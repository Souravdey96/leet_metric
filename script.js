document.addEventListener("DOMContentLoaded", function(){
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress")
    const mediumProgressCircle = document.querySelector(".medium-progress")
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

    // return true or false based on a regex
    function validateUsername(username){
        // function is checking that the username should not be empty
        if(username.trim() == ""){
            alert("username should not be empty");
            return false;
        }

        // function is checking that the username should be valid.
        const regex = /^[a-zA-Z][a-zA-Z0-9_]{3,14}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }

    // async function fetchUserDetails(username) {
    //     const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    //     try{
    //         searchButton.textContent = "Searching..."
    //         searchButton.disabled = true;
    //         const response = await fetch(url);
    //         if(!response.ok){
    //             throw new Error("Unable to fetch User Details");
    //         }
    //         const data = await response.json();
    //         console.log("logging data: ", data);
    //     }
    //     catch(error){
    //         statsContainer.innerHTML = '<p>No data found</p>'
    //     }
    //     finally{
    //         searchButton.textContent = "Search";
    //         searchButton.disabled= false;
    //     }
    // }

async function fetchUserDetails(username) {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    try {
        searchButton.textContent = "Searching...";
        searchButton.disabled = true;

        const response = await fetch(url);
        const data = await response.json();
        console.log("logging data: ", data);

        // Show error message only if user not found
        if (data.status === "error") {
            statsContainer.innerHTML = `<p>${data.message}</p>`;
            cardStatsContainer.innerHTML = ""; // clear old data
            return;
        }

        // ✅ Progress Circles Calculation
        const easyPercent = Math.round((data.easySolved / data.totalEasy) * 100);
        const mediumPercent = Math.round((data.mediumSolved / data.totalMedium) * 100);
        const hardPercent = Math.round((data.hardSolved / data.totalHard) * 100);

        // ✅ Set progress circle styles
        easyProgressCircle.style.background = `conic-gradient(#00b894 ${easyPercent * 3.6}deg, #dfe6e9 0deg)`;
        mediumProgressCircle.style.background = `conic-gradient(#fdcb6e ${mediumPercent * 3.6}deg, #dfe6e9 0deg)`;
        hardProgressCircle.style.background = `conic-gradient(#d63031 ${hardPercent * 3.6}deg, #dfe6e9 0deg)`;

        // ✅ Set label texts
        easyLabel.textContent = `${easyPercent}%`;
        mediumLabel.textContent = `${mediumPercent}%`;
        hardLabel.textContent = `${hardPercent}%`;

        // ✅ Populate stats cards
        cardStatsContainer.innerHTML = `
            <p><strong>Total Solved:</strong> ${data.totalSolved} / ${data.totalQuestions}</p>
            <p><strong>Easy Solved:</strong> ${data.easySolved} / ${data.totalEasy}</p>
            <p><strong>Medium Solved:</strong> ${data.mediumSolved} / ${data.totalMedium}</p>
            <p><strong>Hard Solved:</strong> ${data.hardSolved} / ${data.totalHard}</p>
            <p><strong>Acceptance Rate:</strong> ${data.acceptanceRate}%</p>
            <p><strong>Ranking:</strong> ${data.ranking}</p>
            <p><strong>Contribution Points:</strong> ${data.contributionPoints}</p>
            <p><strong>Reputation:</strong> ${data.reputation}</p>
        `;

    } catch (error) {
        console.error("Fetch error:", error);
        statsContainer.innerHTML = '<p>Something went wrong</p>';
        cardStatsContainer.innerHTML = "";
    } finally {
        searchButton.textContent = "Search";
        searchButton.disabled = false;
    }
}



    // function displayUserData(data){

    // }




    searchButton.addEventListener('click', () => {
        const username = usernameInput.value //fetching value
        console.log("logging username", username);

        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })
})
