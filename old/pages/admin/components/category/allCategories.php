<div class="m-2">
    <?php include __DIR__ . '/insertCategory.php'; ?>
    <?php include __DIR__ . '/updateCategory.php'; ?>
    <a name="" id="" class="btn btn-primary" href="#" role="button" onclick="loadCategoryTable(true)">Sync</a>
    <div class="my-3">
        <table id="categoryTable" class="table table-striped table-bordered" cellspacing="0" width="100%">
        </table>
    </div>
</div>



<script>
    const loadCategoryTable = async (fetch = false) => {
        var categories = JSON.parse(localStorage.getItem("categories"))
        if (!categories || fetch) {
            await $.ajax({
                type: 'GET',
                url: '<?php echo apiHost();?>/categories',
                dataType: 'json',
                success: function(response) {
                    localStorage.setItem('categories', JSON.stringify(response))
                    categories = response;
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        }

        $('#categoryTable').html(
            `
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody id="catsData">
            </tbody>
            <tfoot>
                <tr>
                </tr>
            </tfoot>
        `
        )
        for (const [key, value] of Object.entries(categories[0])) {
            $('#categoryTable thead tr').append(
                `<th class="th-sm">${key}</th>`
            );
            $('#categoryTable tfoot tr').append(
                `<th>${key}</th>`
            )
        }
        $('#categoryTable thead tr').append(
            `<th class="th-sm">action</th>`
        );
        $('#categoryTable tfoot tr').append(
            `<th>action</th>`
        )
        const tableData = (d) => {
            var r = "";
            for (const [key, value] of Object.entries(d)) {
                r = r + `<td>${value}</td>`
            }
            return r;
        }

        categories.map((r) => {
            $("#catsData").append(`
                        <tr id="cat_${r.id}"> 
                            ${tableData(r)}
                            <td>
                                <button type="button" onclick='updateCatForm(${JSON.stringify(r)})' class="btn btn-primary btn-sm">Edit</button>
                                <button type="button" onclick='deleteCat(${r.id})' class="btn btn-primary btn-sm">Delete</button>
                            </td>
                        </tr>
                    `)
        });
        $('#categoryTable').DataTable().destroy()
        $('#categoryTable').DataTable();
        $('.dataTables_length').addClass('bs-select');
    }




    function deleteCat(catId) {
        $.ajax({
            type: 'POST',
            url: '<?php echo apiHost();?>/categories',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer <?php echo isset($_SESSION['bearer']) ? $_SESSION['bearer'] : "no bear bro"; ?>');
            },
            dataType: 'json',
            data: `id=${catId}&_method=DELETE`,
            success: function(response) {
                var categories = JSON.parse(localStorage.getItem("categories")) || [];
                var upDatedCats = categories.filter(c => c.id !== `${catId}`);
                localStorage.setItem('categories', JSON.stringify(upDatedCats))
                loadCategoryTable();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }

    //load local or online
    $(document).ready(function() {
        loadCategoryTable()
    })
</script>