import "./aa.css"
import axios from "axios";


const Photos = ({
  userid,
  imgurl,
  secret,
  imgnum,
}) => {
  const handleDelete = (e) => {
    if (window.confirm('삭제하시겠습니까?')) {
      console.log("handleDelete(imgnum) =>", imgnum);
      axios
        .post("http://localhost:8008/idelete",
          { imgnum: e.target.id }
        )
        .then((res) => {
          alert('삭제되었습니다')
          console.log(res)
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      alert('삭제가 취소되었습니다')
    }
    window.location.reload()
  };




  console.log("url", imgurl);
  // const image = "http://localhost:8008/uploads/" + imgurl;
  return (
    <div className="out_img">
      <img className="img" src={imgurl} />

      <input
        id={imgnum}
        type="button"
        value="삭제"
        // id={imgurl}
        onClick={handleDelete}
      ></input>



    </div >




  )
}


// {
//   src: 'https://images.unsplash.com/photo-1594415156038-02d665441df2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
//   width: 4,
//   height: 3,
// },
// {
//   src: 'https://images.unsplash.com/photo-1463740839922-2d3b7e426a56?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1600',
//   width: 1,
//   height: 1,
// },
// {
//   src: 'https://images.unsplash.com/photo-1592395834504-eb81d1425f5d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
//   width: 3,
//   height: 4,
// },
// {
//   src: 'https://images.unsplash.com/photo-1592472881220-238b8383c490?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
//   width: 3,
//   height: 4,
// },
// {
//   src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
//   width: 3,
//   height: 4,
// },
// {
//   src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599',
//   width: 4,
//   height: 3,
// },
// {
//   src: 'https://source.unsplash.com/zh7GEuORbUw/600x799',
//   width: 3,
//   height: 4,
// },
// {
//   src: 'https://source.unsplash.com/PpOHJezOalU/800x599',
//   width: 4,
//   height: 3,
// },
// {
//   src: 'https://source.unsplash.com/I1ASdgphUH4/800x599',
//   width: 4,
//   height: 3,
// },
// {
//   src: 'https://source.unsplash.com/XiDA78wAZVw/600x799',
//   width: 3,
//   height: 4,
// },
// {
//   src: 'https://source.unsplash.com/x8xJpClTvR0/800x599',
//   width: 4,
//   height: 3,
// },
// {
//   src: 'https://source.unsplash.com/u9cG4cuJ6bU/4927x1000',
//   width: 4927,
//   height: 1000,
// },
// {
//   src: 'https://source.unsplash.com/qGQNmBE7mYw/800x599',
//   width: 4,
//   height: 3,
// },
// {
//   src: 'https://source.unsplash.com/NuO6iTBkHxE/800x599',
//   width: 4,
//   height: 3,
// },
// {
//   src: 'https://source.unsplash.com/pF1ug8ysTtY/600x400',
//   width: 4,
//   height: 3,
// },
// {
//   src: 'https://source.unsplash.com/A-fubu9QJxE/800x533',
//   width: 4,
//   height: 3,
// },
// {
//   src: 'https://source.unsplash.com/5P91SF0zNsI/740x494',
//   width: 4,
//   height: 3,
// },

export default Photos;