import React from 'react';
import cx from 'classnames';
import defaultAvatar from 'assets/images/default-avatar.png';
const styleImage = {
'width': '200px',
'height': '200px',
'margin-right':'600px'
}
const styleInput = {
}
function readURL(event) {
  const tgt = event.target || window.event.srcElement,
        files = tgt.files;
        if (FileReader && files && files.length) {
          var reader = new FileReader();
          reader.onload = function (e) {
            document.getElementById('myimg').setAttribute('src',e.target.result);
        }
        console.log(files[0]);
        reader.readAsDataURL(files[0]);
      }
  
      // Not supported
      else {
          // fallback -- perhaps submit the input to an iframe and temporarily store
          // them on the server until the user's session ends.
      }
}
const File = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  inputClassName,
  placeholder,
  helpText,
  disabled
}) => (
  <div>
  <div className="form-group">
  <label className="col-sm-3 control-label">AVATAR</label>
    <div className="col-sm-9">
    <img style={styleImage} src={defaultAvatar}  id="myimg" />
    </div>
    </div>
    <div className="form-group">
    <label className="col-sm-3 control-label"></label>
    <div className="col-sm-9"></div>
    <div className="col-sm-9">
    <input {...input} type={type} style={styleInput}  name={input.name} size = '50' onChange={(e)=>readURL(e)}/>
    </div>
    </div>
    </div>
);

export default File;