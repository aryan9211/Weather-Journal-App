/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();

// fetch project data
const fetchProjectData = async () => {
  try {
    const response = await fetch("/api/project-data");
    const body = await response.json();
    console.log("fetchProjectData, success: " + JSON.stringify(body));
    return body;
  } catch (error) {
    console.log("fetchProjectData, failure: " + error);
  };
};

// fetchProjectData();


// call fetchProjectData() and update respective page elements
const updateElements = async () => {
  try {
    // clear input fields
    const inputZip = document.querySelector("input#zip");
    const inputFeelings = document.querySelector("textarea#feelings");
    inputZip.value = "";
    inputFeelings.value = "";
    // pull data from /api/project-data
    const projectData = await fetchProjectData();
    // create elements in fragment
    const docFragment = document.createDocumentFragment();
    const dateDiv = document.createElement("div");
    const tempDiv = document.createElement("div");
    const contentDiv = document.createElement("div");
    dateDiv.id = "date";
    tempDiv.id = "temp";
    contentDiv.id = "content";
    dateDiv.innerHTML = newDate;
    tempDiv.innerHTML = projectData.temperature;
    contentDiv.innerHTML = projectData.feelings;
    docFragment.appendChild(dateDiv);
    docFragment.appendChild(tempDiv);
    docFragment.appendChild(contentDiv);

    const entryHolder = document.querySelector("div#entryHolder");
    entryHolder.appendChild(docFragment);

    // console.log(projectData);
  } catch (error) {
    console.log("updateElements error:  " + error);
  };
};


// POST form data to /api/project-data and call updateElements()
const postProjectDataAPI = async () => {
  // get element values
  const postData = {
    zip: document.querySelector("input#zip").value,
    feelings: document.querySelector("textarea#feelings").value
  };
  // use fetch to make POST if data present in both form fields
  if (zip && feelings) {
    try {
      const url = "/api/project-data";
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        crendentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      })
      updateElements();
    } catch (error) {
      console.log("postProjectDataAPI error:  " + error);
    };
  };
};


function clickGenerateEvent() {
  const button = document.querySelector("button#generate");
  button.addEventListener("click", function () { setTimeout(postProjectDataAPI, 0) } );
};

clickGenerateEvent();