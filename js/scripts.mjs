function toggleContent(button) {
    const boxContent = button.parentNode.querySelector('.collapsible-content');
    const isContentVisible = window.getComputedStyle(boxContent).display !== 'none';
  
    if(isContentVisible) {
      boxContent.style.display = 'none';
      button.innerHTML = '<i class="fas fa-angle-down"></i>';
    } else {
      boxContent.style.display = 'block';
      button.innerHTML = '<i class="fas fa-angle-up"></i>';
    }
}
  

function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function openNotImplementedModal() {
    openModal('notImplementedModal');  // Then, open the new modal
}

document.querySelector(".close").addEventListener("click", closeModal);


/*
closing behavior for modals
*/

// Function to set up close behavior for all modals
function setupGlobalModalCloseBehavior() {
    // Close modal if the user clicks outside of any modal content area
    window.onclick = function(event) {
      if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
      }
    };
}
  
// Call the function when the script loads to ensure the behavior is applied
setupGlobalModalCloseBehavior();

// Close button behavior for each modal
document.querySelectorAll('.close').forEach(function(closeBtn) {
    closeBtn.onclick = function() {
      var modal = this.closest('.modal');
      modal.style.display = 'none';
    };
});
  