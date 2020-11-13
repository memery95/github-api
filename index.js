
function getRepos(query) {
    fetch(`https://api.github.com/users/${query}/repos`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(responseJson => displayResults(responseJson))
      .catch(error => {
        $("#js-error-message").text(`Sorry! Something went wrong: ${error.message}`);
        $("#display-results").addClass('hidden');
      })
}
  
function displayResults(responseJson) {
    $("#results-list").empty();
    $("#js-error-message").text("");
    for (let i in responseJson) {
      $("#results-list").append(
        `<li class="list-item"><h3 class="repo-title">Repo name: <em>${responseJson[i].name}</em></h3>
        <p class="repo-url"><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p></li>`
      )
      console.log(responseJson[i].name);
      console.log(responseJson[i].html_url);
    }
    $("#display-results").removeClass('hidden');
}
  
function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $("#userName").val();
      getRepos(searchTerm);
    });
}
  
$(watchForm);