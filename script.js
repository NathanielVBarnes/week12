$(document).ready(function () {
    const apiUrl = '';
  
    // Load items on page load
    function loadItems() {
      $('#itemList').empty();
      $.get(apiUrl, function (data) {
        data.forEach(function (item) {
          $('#itemList').append(`<li>${item.name} <button class="btn btn-link btn-sm delete" data-id="${item.id}">Delete</button></li>`);
        });
      });
    }
  
    // Initial load
    loadItems();
  
    // Add new item
    $('#addItemForm').submit(function (event) {
      event.preventDefault();
      const itemName = $('#itemName').val();
      $.post(apiUrl, { name: itemName }, function () {
        loadItems();
        $('#itemName').val('');
      });
    });
  
    // Delete item
    $('#itemList').on('click', '.delete', function () {
      const itemId = $(this).data('id');
      $.ajax({
        url: `${apiUrl}/${itemId}`,
        type: 'DELETE',
        success: function () {
          loadItems();
        }
      });
    });
  });
  