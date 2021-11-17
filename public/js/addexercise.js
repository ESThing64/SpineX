$(document).ready(function(){
    $('.add-exercise').on('click', async function(){
     
      console.log("button was presses")
       console.log('working', $(this).attr('id'))
       const id = $(this).attr('id')

       const response = await fetch('/api/add/'+id, {
        method: 'POST',

      });

      if (response.ok) {


      
        await Toastify({
          text: "That exercise has been added to your list!",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          
        }).showToast();
        
        // document.location.reload()
  
        } else {
          alert(response.statusText);
        }
  
      
      

    })
    
    
    console.log("hello");
    
})
