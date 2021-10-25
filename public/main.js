var trash = document.getElementsByClassName("fa-trash");


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const age = this.parentNode.parentNode.childNodes[1].innerText
        // const age = this.parentNode.parentNode.childNodes[3].innerText
        console.log(age)
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'age': age
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
