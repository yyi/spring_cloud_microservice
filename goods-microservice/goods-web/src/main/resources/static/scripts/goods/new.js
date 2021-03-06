$(function(){
	$('#saveForm').validate({
        rules: {
            name       :{required:true},
            price      :{required:true}
        },messages:{
            name :{required:"必填"},
            price :{required:"必填"}
        }
 	});

    $('#sortsid').change(function(){
        var index = this.selectedIndex;
        var sortsid = this.options[index].value;

        var $option = $('#subsid').empty();
        var html = '<option value="" selected = true>请选择</option>';
        $.each(sortses,function(k,v) {
            if(v.id == sortsid) {
                $.each(v.subsortses, function (j, w) {
                    html += '<option value="' + w.id + '">' + w.name + '</option>';
                });
                return false;
            }
        });
        $option.append($(html));
    });
});

function saveNew(){
    $("#contents").val(ME.getContent());
    if($('#saveForm').valid()){
        $.ajax({
            type: "POST",
            url: "./save",
            data: $("#saveForm").serialize(),
            headers: {"Content-type": "application/x-www-form-urlencoded;charset=UTF-8"},
            success: function (data) {
                if (data > 0) {
                    alert("保存成功");
                    window.location.href = "./index";
                } else {
                    alert(data);
                }
            },
            error:function(data){
                $.each(data,function(v){
                    alert(v);
                });
            }
        });
    }else{
        alert('数据验证失败，请检查！');
    }
}

