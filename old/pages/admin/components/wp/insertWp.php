<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newWpModal">
    New wpName
</button>

<!-- Modal -->
<div class="modal fade" id="newWpModal" tabindex="-1" aria-labelledby="newWpModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <input type="url" id="wpurlCheck" /><button class="btn btn-primary" href="#" onclick="autoLoadData($('#wpurlCheck').val())">check</button>
            <form id="wpForm">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="newWpModalLabel">New Wp</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- <input type="hidden" name="_method" value=""> -->
                    <div class="form-group">
                        <label for="wpName">wpName</label>
                        <input type="text" class="form-control" id="wpName" name="name" aria-describedby="wpNameHelp" placeholder="Enter New wpName" required>
                        <small id="wpNameHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div class="form-group">
                        <label for="color_hue">color_hue</label>
                        <input type="number" class="form-control" id="color_hue" class="p-2" min="0" max="360" name="color_hue" style="color:#ffffff" />
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
                        <input type="range" class="form-range" id="color_hue_range">
                        <small id="color_hueHelp" class="form-text text-muted">color</small>
                    </div>

                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea name="description" id="description" class="form-control" placeholder="Description" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="url">url</label>
                        <textarea name="url" id="url" class="form-control" placeholder="url" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="site_icon_url">site_icon_url</label>
                        <img src="" alt="" id="imageShow" style="height:80px;">
                        <textarea name="site_icon_url" id="site_icon_url" class="form-control" placeholder="site_icon_url" required></textarea>
                    </div>

                    <div class="form-group">
                        <label for="keywords">keywords</label>
                        <textarea name="keywords" id="keywords" class="form-control" placeholder="keywords" required></textarea>
                    </div>
                    <!-- <div class="form-group">
                    <label for="categories_ids">categories_ids</label>
                    <textarea name="categories_ids" id="categories_ids" class="form-control" placeholder="categories_ids" required></textarea>
                </div> -->
                    <div class="form-group" id="selectCatagory">
                    </div>
                    <script>
                        var categories = JSON.parse(localStorage.getItem("categories")) || [];
                        categories.map((c) =>
                            $('#selectCatagory').append(`
                            <div class="form-check">
                                <input name="categories_ids[]" class="form-check-input" type="checkbox" value="${c.id}" id="${c.id}">
                                <label class="form-check-label" for="${c.id}">
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
</div>

<script>
    function autoLoadData(url){
        getWPInfo(url,(err, data)=>{
            if(!err){
                $('#wpName').val(data.name);
                $('#description').html(data.description);
                $('#url').val(data.url);
                $('#site_icon_url').val(data.site_icon_url);
                $('#imageShow').attr('src',data.site_icon_url);
            }
        })
    }
    // Submit form data via AJAX
    $(document).ready(function() {
        var defaultColor = 20;
        $('#color_hue').val(defaultColor);
        $('#color_hue_range').val(defaultColor / 360 * 100);
        $('#color_hue').css("background-color", `hsl(${defaultColor},80%,50%)`);


        $('#color_hue_range').on("change", function() {
            var val = +$(this).val();
            var rotAmount = parseInt((val / 100) * 360)
            $('#color_hue').val(rotAmount);
            $('#color_hue').css("background-color", `hsl(${rotAmount},80%,50%)`);
        });
        $('#color_hue').on("keydown", function() {
            var val = +$(this).val();
            $('#color_hue_range').val(val / 360 * 100);
            $('#color_hue').css("background-color", `hsl(${val},80%,50%)`);
        });

        $('#color_hue').on("change", function() {
            var val = +$(this).val();
            $('#color_hue_range').val(val / 360 * 100);
            $('#color_hue').css("background-color", `hsl(${val},80%,50%)`);
        });


        $('#wpForm').submit(function(event) {
            // Stop form from submitting normally
            event.preventDefault();

            // Get form data
            var formData = $('#wpForm').serialize();

            // Submit form data via AJAX
            // console.log(formData)
            $.ajax({
                type: 'POST',
                url: '<?php echo apiHost();?>/wp',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer <?php echo isset($_SESSION['bearer']) ? $_SESSION['bearer'] : "no bear bro"; ?>');
                },
                data: formData,
                dataType: 'json',
                success: function(response) {
                    $('#newWpModal').modal("hide")
                    var wp = JSON.parse(localStorage.getItem("wp")) || [];
                    wp.push(response);
                    localStorage.setItem('wp', JSON.stringify(wp))
                    loadWpTable()
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        });
    });
</script>