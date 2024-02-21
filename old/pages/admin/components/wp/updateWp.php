<div class="modal fade" id="wpUpdateModal" tabindex="-1" aria-labelledby="wpUpdateModalLabel" aria-hidden="true">wpUpdateModal
    <div class="modal-dialog">
        <form id="wpUpdateForm" class="modal-content">
            <input type="hidden" name="_method" value="PUT">
            <input type="hidden" name="id" value="" id="updataWpId">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="wpUpdateModalLabel">Update Wp</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- <input type="hidden" name="_method" value=""> -->
                <div class="form-group">
                    <label for="upateWpName">wpName</label>
                    <input type="text" class="form-control" id="upateWpName" name="name" aria-describedby="wpNameHelp" placeholder="Enter New wpName" required>
                    <small id="wpNameHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="update_color_hue">color_hue</label>
                    <input type="number" class="form-control" id="update_color_hue" class="p-2" min="0" max="360" name="color_hue" style="color:#ffffff" />
                    <div class="p-2" style="background: linear-gradient(
                        90deg,
                        rgba(255, 0, 0, 1) 0%,
                        rgba(255, 154, 0, 1) 10%,
                        rgba(208, 222, 33, 1) 20%,
                        rgba(79, 220, 74, 1) 30%,
                        rgba(63, 218, 216, 1) 40%,
                        rgba(47, 201, 226, 1) 50%,
                        rgba(28, 127, 238, 1) 60%,
                        rgba(95, 21, 242, 1) 70%,
                        rgba(186, 12, 248, 1) 80%,
                        rgba(251, 7, 217, 1) 90%,
                        rgba(255, 0, 0, 1) 100%
                    );">
                    </div>
                    <input type="range" class="form-range" id="update_color_hue_range">
                </div>

                <div class="form-group">
                    <label for="wpUpdatedescription">wpUpdatedescription</label>
                    <textarea name="description" id="wpUpdatedescription" class="form-control" placeholder="wpUpdatedescription" required></textarea>
                </div>
                <div class="form-group">
                    <label for="wpUpdateUrl">wpUpdateUrl</label>
                    <textarea name="url" id="wpUpdateUrl" class="form-control" placeholder="wpUpdateUrl" required></textarea>
                </div>
                <div class="form-group">
                    <label for="site_icon_wpUpdateUrl">site_icon_wpUpdateUrl</label>
                    <textarea name="site_icon_url" id="site_icon_wpUpdateUrl" class="form-control" placeholder="site_icon_wpUpdateUrl" required></textarea>
                </div>

                <div class="form-group">
                    <label for="wpUpdatekeywords">wpUpdatekeywords</label>
                    <textarea name="keywords" id="wpUpdatekeywords" class="form-control" placeholder="wpUpdatekeywords" required></textarea>
                </div>

                <div class="form-group" id="selectUpdateCatagory">
                </div>
                <script>
                    var categories = JSON.parse(localStorage.getItem("categories")) || [];
                    categories.map((c) =>
                        $('#selectUpdateCatagory').append(`
                            <div class="form-check">
                                <input name="categories_ids[]" class="form-check-input" type="checkbox" value="${c.id}" id="update${c.id}" >
                                <label class="form-check-label" for="update${c.id}">
                                    ${c.name}
                                </label>
                            </div>
                        `)
                    )
                </script>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Publish</button>
            </div>
        </form>
    </div>
</div>

<script>
    function wpUpdateForm(data) {

        $('#wpUpdateModal').modal("show");
        $('#updataWpId').val(data.id);
        $('#upateWpName').val(data.name);

        $('#update_color_hue').val(data.color_hue);
        $('#update_color_hue_range').val(data.color_hue / 360 * 100);
        $('#update_color_hue').css("background-color", `hsl(${data.color_hue},80%,50%)`);

        $('#wpUpdatedescription').html(data.description);
        $('#site_icon_wpUpdateUrl').html(data.site_icon_url);
        $('#wpUpdateUrl').html(data.url);
        $('#wpUpdatekeywords').html(data.keywords);


        var theCats = $.parseJSON(data.categories_ids);
        theCats.map((c) => {
            $('#update' + c).attr('checked', true);
        })
    }




    $('#update_color_hue_range').on("change", function() {
        var val = +$(this).val();
        var rotAmount = parseInt((val / 100) * 360)
        $('#update_color_hue').val(rotAmount);
        $('#update_color_hue').css("background-color", `hsl(${rotAmount},80%,50%)`);
    });
    $('#update_color_hue').on("keydown", function() {
        var val = +$(this).val();
        $('#update_color_hue_range').val(parseInt(val / 360 * 100));
        $('#update_color_hue').css("background-color", `hsl(${val},80%,50%)`);
    });

    $('#update_color_hue').on("change", function() {
        var val = +$(this).val();
        $('#update_color_hue_range').val(parseInt(val / 360 * 100));
        $('#update_color_hue').css("background-color", `hsl(${val},80%,50%)`);
    });

    // Submit form data via AJAX
    $(document).ready(function() {
        $('#wpUpdateForm').submit(function(event) {
            // Stop form from submitting normally
            event.preventDefault();

            // Get form data
            var formData = $('#wpUpdateForm').serialize();
            // console.log(formData)
            // Submit form data via AJAX
            // console.log(formData)
            $.ajax({
                type: 'POST',
                url: '<?php echo apiHost();?>/wp/',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer <?php echo isset($_SESSION['bearer']) ? $_SESSION['bearer'] : "no bear bro"; ?>');
                },
                data: formData,
                dataType: 'json',
                success: function(response) {
                    $('#wpUpdateModal').modal("hide")

                    var wp = JSON.parse(localStorage.getItem("wp")) || [];



                    var i = wp.findIndex(c => c.id == `${response.id}`);
                    wp[i] = response;
                    localStorage.setItem('wp', JSON.stringify(wp))
                    loadWpTable()
                    setTimeout(() => {
                        $(`#wp_${response.id}`).removeClass("change")
                    }, 2000)
                    $(`#wp_${response.id}`).addClass("change");

                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        });
    });
</script>