<div class="m-2">
    <?php include __DIR__ . '/insertWp.php'; ?>
    <?php include __DIR__ . '/updateWp.php'; ?>
    <a name="" id="" class="btn btn-primary" href="#" role="button" onclick="loadWpTable(true)">Sync</a>
    <div class="my-3">
        <table id="wpTable" class="_nowrap table table-striped table-bordered" cellspacing="0" width="100%">
        </table>
    </div>
</div>

<script>
    const loadWpTable = async (fetch = false) => {
        var showCols = ['description', 'name', 'color_hue', 'site_icon_url', 'id', 'url']

        var wp = JSON.parse(localStorage.getItem("wp"))
        if (!wp || fetch) {
            await $.ajax({
                type: 'GET',
                url: '<?php echo apiHost();?>/wp',
                dataType: 'json',
                success: function(response) {
                    localStorage.setItem('wp', JSON.stringify(response))
                    wp = response;
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        }

        $('#wpTable').html(
            `
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody id="wpData">
            </tbody>
            <tfoot>
                <tr>
                </tr>
            </tfoot>
        `
        )
        for (const [key, value] of Object.entries(wp[0])) {

            if (showCols.includes(key)) {
                $('#wpTable thead tr').append(
                    `<th class="th-sm">${key}</th>`
                );
                $('#wpTable tfoot tr').append(
                    `<th>${key}</th>`
                )
            }
        }
        $('#wpTable thead tr').append(
            `<th class="th-sm">action</th>`
        );
        $('#wpTable tfoot tr').append(
            `<th>action</th>`
        )




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

        const tableData = (d) => {
            var r = "";
            for (const [key, value] of Object.entries(d)) {
                if (showCols.includes(key)) {
                    if (key == 'categories_ids') {
                        var catsNames = [];
                        theCats = $.parseJSON(value);
                        theCats.map((catId) => {
                            var isCat = categories.filter(c => c.id == catId)[0]
                            isCat ? catsNames.push(isCat.name) : catsNames.push(`"${catId}"`)
                        })
                        // console.log(catsNames);
                        r = r + `<td>
                                ${catsNames.join(', ')}
                            </td>`
                    } else if (key == 'color_hue') {
                        r = r + `<td>
                        <span style="background-color:hsl(${value},100%,40%)" class="p-1 mx-1"></span>
                        <span style="color:hsl(${value},100%,40%)">${Array.isArray(value)?JSON.stringify(value):value}°</span>
                </td>`
                    } else if (key == 'site_icon_url') {
                        r = r + `<td>
                        <img src="${value}" style="height:40px"/>
                </td>`
                    } else {
                        r = r + `<td>
                ${Array.isArray(value)?JSON.stringify(value):value}
                </td>`
                    }
                }
            }
            return r;
        }

        wp.map((r) => {
            $("#wpData").append(`
                        <tr id="wp_${r.id}"> 
                            ${tableData(r)}
                            <td>
                                <button type="button" onclick='wpUpdateForm(${JSON.stringify(r)})' class="btn btn-primary btn-sm">Edit</button>
                                <button type="button" onclick='deleteWp(${r.id})' class="btn btn-primary btn-sm">Delete</button>
                            </td>
                        </tr>
                    `)
        });
        $('#wpTable').DataTable().destroy()
        $('#wpTable').DataTable();
        $('.dataTables_length').addClass('bs-select');
    }




    function deleteWp(catId) {
        $.ajax({
            type: 'POST',
            url: '<?php echo apiHost();?>/wp',
            beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer <?php echo isset($_SESSION['bearer']) ? $_SESSION['bearer'] : "no bear bro"; ?>');
                },
            dataType: 'json',
            data: `id=${catId}&_method=DELETE`,
            success: function(response) {
                var wp = JSON.parse(localStorage.getItem("wp")) || [];
                var upDatedCats = wp.filter(c => c.id !== `${catId}`);
                localStorage.setItem('wp', JSON.stringify(upDatedCats))
                loadWpTable();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }

    //load local or online
    $(document).ready(function() {
        loadWpTable()
    })
</script>