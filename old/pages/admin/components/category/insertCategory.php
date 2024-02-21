<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newCatModal">
    New Category
</button>

<!-- Modal -->
<div class="modal fade" id="newCatModal" tabindex="-1" aria-labelledby="newCatModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <form id="categoryForm" class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="newCatModalLabel">New Category</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- <input type="hidden" name="_method" value=""> -->
                <div class="form-group">
                    <label for="catName">Category</label>
                    <input type="text" class="form-control" id="catName" name="name" aria-describedby="categoryHelp" placeholder="Enter New Category" required>
                    <small id="categoryHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea name="description" id="description" class="form-control" placeholder="Description" required></textarea>
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
    $(document).ready(function() {
        $('#categoryForm').submit(function(event) {
            // Stop form from submitting normally
            event.preventDefault();

            // Get form data
            var formData = $('#categoryForm').serialize();

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
                    $('#newCatModal').modal("hide")
                    var categories = JSON.parse(localStorage.getItem("categories"))||[];
                    categories.push(response);
                    localStorage.setItem('categories', JSON.stringify(categories))
                    loadCategoryTable()
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        });
    });
</script>