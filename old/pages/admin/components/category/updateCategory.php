<div class="modal fade" id="updateCatModal" tabindex="-1" aria-labelledby="updateCatModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <form id="categoryUpdateForm" class="modal-content">
            <input type="hidden" name="_method" value="PUT">
            <input type="hidden" name="id" value="" id="updateCatId">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="updateCatModalLabel">Update Category</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- <input type="hidden" name="_method" value=""> -->
                <div class="form-group">
                    <label for="updateCatName">Category</label>
                    <input type="text" class="form-control" name="name" aria-describedby="categoryHelp" placeholder="Enter New Category" id="updateCatName" required value="">
                    <small id="categoryHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea name="description" id="updateDescription" class="form-control" placeholder="Description" required></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Publish</button>
            </div>
        </form>
    </div>
</div>

<script>
    // Submit form data via AJAX
    function updateCatForm(data) {
        $('#updateCatModal').modal("show");
        $('#updateCatId').val(data.id);
        $('#updateCatName').val(data.name);
        $('#updateDescription').html(data.description);
    }
    $(document).ready(function() {
        $('#categoryUpdateForm').submit(function(event) {
            // Stop form from submitting normally
            event.preventDefault();

            // Get form data
            var formData = $('#categoryUpdateForm').serialize();

            // Submit form data via AJAX
            // console.log(formData)
            $.ajax({
                type: 'POST',
                url: '<?php echo apiHost();?>/categories',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer <?php echo isset($_SESSION['bearer']) ? $_SESSION['bearer'] : "no bear bro"; ?>');
                },
                data: formData,
                dataType: 'json',
                success: function(response) {
                    $('#updateCatModal').modal("hide");
                    var categories = JSON.parse(localStorage.getItem("categories")) || [];
                    var i = categories.findIndex(c => c.id == `${response.id}`);
                    categories[i] = response;
                    localStorage.setItem('categories', JSON.stringify(categories))
                    loadCategoryTable();
                    setTimeout(() => {
                        $(`#cat_${response.id}`).removeClass("change")
                    }, 2000)
                    $(`#cat_${response.id}`).addClass("change");
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        });
    });
</script>