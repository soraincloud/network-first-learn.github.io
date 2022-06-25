let Student = function(no, name, s1, s2, s3)
{
	this.no = no;
	this.name = name;
	this.s1 = s1;
	this.s2 = s2;
	this.s3 = s3;
}

let DataCtrl = function( e )
{
	this.element = e; // 绑定element
	e.controller = this; // 在element上绑定this对象，可以直接通过element访问到数据对象

	this.remove = function(index)
    {
		let msg = 
		{
			no:resp1.data.data[index].no
		}
		axios.post("http://127.0.0.1:5000/remove", formData = msg)
		.then(function(resp)
        {
			if(resp.data.code!=100)
			{
				alert(resp.data.data);
			}
		e.controller.refresh();
	    })
	}

	this.add = function(s)
	{
		let msg = 
		{
			no:s[s.length-1].no,
			name:s[s.length-1].name,
			s1:s[s.length-1].s1,
			s2:s[s.length-1].s2,
			s3:s[s.length-1].s3
		}
		axios.post("http://127.0.0.1:5000/add", formData = msg)
		.then(function(resp)
        {
		if(resp.data.code!=100)
		{
			alert(resp.data.data);
		}
		e.controller.refresh();
	    })
	}

	this.refresh = function()
	{
		axios.get("http://127.0.0.1:5000/get")
		.then(function(resp)
        {
			resp1=resp;
			let res = [];
			for(let i=0;i<resp.data.data.length;i++)
            {
				res += "<tr>";
				res += "<td>"+parseInt(i+1)+"</td>";
				res += "<td>"+resp.data.data[i].no+"</td>";
				res += "<td>"+resp.data.data[i].name+"</td>";
				res += "<td>"+resp.data.data[i].s1+"</td>";
				res += "<td>"+resp.data.data[i].s2+"</td>";
				res += "<td>"+resp.data.data[i].s3+"</td>";
				res += "<td>"+"<button class=\"btn btn-danger\" onclick=\"delbut("+i+")\">"+"删除"+"<tton>"+"</td>";
				res += "</tr>";
			}
			document.getElementById("result").innerHTML = res;
		})
	}
};

window.onload=function()
{
	let dc = new DataCtrl(document.getElementById('result'));
	onAdd = function()
    {
		no = document.getElementById("number").value;
		name = document.getElementById("name").value;
		s1 = document.getElementById("score1").value;
		s2 = document.getElementById("score2").value;
		s3 = document.getElementById("score3").value;
		resp1.data.data.push(new Student(no,name,s1,s2,s3));
		dc.add(resp1.data.data);
		dc.refresh();
	}
	delbut = function(i)
    {
		return dc.remove(i);
	}
	dc.refresh(); // 加载后需要刷新页面
}