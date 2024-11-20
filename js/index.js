var nameInput = document.getElementById("name")
var urlInput = document.getElementById("url")

var sitesList = [];

if(localStorage.getItem("sites") !=null){
    sitesList = JSON.parse( localStorage.getItem("sites"))
display(sitesList)
}

function addSite() {
    if (nameValid() && urlValid()) {

        var siteName = nameInput.value;
        var siteExists = sitesList.some(site => site.websiteName.toLowerCase() === siteName.toLowerCase());
        if (siteExists) {
            Swal.fire({
                title: "Duplicate Site Name",
                text: "A site with this name already exists. Please choose a different name.",
                icon: "warning",
                confirmButtonText: "Ok",
                confirmButtonColor: "#f39c12", 
            });
            return; 
        }
        var site = {
            websiteName: nameInput.value,
            websiteUrl: urlInput.value
        };
        sitesList.push(site);
        display(sitesList);
        localStorage.setItem("sites", JSON.stringify(sitesList));

        clearInput();
    } else {
        Swal.fire({
            title: "Validation Error",
            text: "Site Name or URL is not valid, please follow the rules below:",
            icon: "error",
            html: `
                <ul style="text-align: left;">
                <li>Site name must contain at least <strong>3 characters</strong>.</li>
                <li>Site URL must be a valid one.</li>
                </ul>
            `,
            confirmButtonText: "Got it",
            confirmButtonColor: "#e74c3c",
        });
    }

    nameInput.classList.remove("is-valid", "is-invalid");
    urlInput.classList.remove("is-valid", "is-invalid");
}



    function clearInput(){
        nameInput.value = null
        urlInput.value = null
    }

    
function display(arr) {
    var cartona = ``;
    for (var i = 0; i < arr.length; i++) {
    cartona += `
    <tr>
                    <td>${i+1}</td>
                    <td>${arr[i]. websiteName}</td>
                <td><button type="button" class="btn btn-success" onclick="window.open('${arr[i].websiteUrl}', '_blank')"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
                <td><button type="button" class="btn btn-danger" onclick="DeleteSite(${i})"><i class="fa-solid fa-trash"></i> Delete </button></td>
                </tr>
    
    `;
}
document.getElementById("body").innerHTML = cartona ;

}

function DeleteSite(index){
    sitesList.splice(index,1)
    localStorage.setItem("sites",JSON.stringify(sitesList))
    display(sitesList)
    console.log(sitesList);
    
}






function nameValid(){
    var regex = /^\w{4,15}$/i;
    var testString= nameInput.value;
    if(regex.test(testString)){
        nameInput.classList.add("is-valid");
        nameInput.classList.remove("is-invalid");
                return true;
        
    }else{
            nameInput.classList.add("is-invalid");
            nameInput.classList.remove("is-valid");
            return false;
        
            }
    
}

function urlValid(){
    var regex = /^(https:\/\/|http:\/\/)?(www\.)?.{3,9}(\.com)\/?$/i;
    var testString= urlInput.value;
    console.log(regex.test(testString))
    if(regex.test(testString)){
        urlInput.classList.add("is-valid");
        urlInput.classList.remove("is-invalid");
        return true;
        
    }else{
        urlInput.classList.add("is-invalid");
        urlInput.classList.remove("is-valid");
        return false;
    }
    
}





