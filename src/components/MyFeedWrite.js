import './MyFeedWrite';
import '../css/myFeedWrite.scss';
import { BiPaperPlane } from 'react-icons/bi';

function MyFeedWrite() {
  return (
    <div className="MyFeedWrite">
      <div className="form-wrapper">
        <form>
          <table border="none" width="700px" align="center">
            <input
              type="text"
              name="title"
              size="68"
              placeholder="일상을 입력하세요"
            ></input>
            <button className="submit-button">
              <BiPaperPlane />
            </button>
          </table>
        </form>
      </div>
    </div>
  );
}

export default MyFeedWrite;
