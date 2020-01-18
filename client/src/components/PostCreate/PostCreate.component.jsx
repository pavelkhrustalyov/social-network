import React, { useState, createRef } from 'react';
import './PostCreate.styles.scss';
import CustomTextArea from '../CustomTextArea/CustomTextArea.component';
import CustomButton from '../CustomButton/CustomButton.component';
import CustomInput from '../CustomInput/CustomInput.component';
import MainBg from '../MainBg/MainBg.component';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { connect } from 'react-redux';
import { createPost } from '../../redux/users/users.actions';

const PostCreate = ({ createPost, theme }) => {
    const [postImg, setPostImg] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const inputFile = createRef();
    const [ activeSmiles, setActiveSmiles ] = useState(false);
    let [text, setText] = useState('');

    const onChangeFile = (e) => {
        setPostImg(e.target.files[0]);
        setImgPreview(URL.createObjectURL(e.target.files[0]));
    }

    const onSelectSmile = (smile) => {
        setText(text += smile.native);
    }

    const clearInput = () => {
        inputFile.current.value = null;
        setPostImg(null);
        setImgPreview(null);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        setActiveSmiles(false);
        if (!text.trim() && !postImg) {
            return;
        }
        let fD = new FormData();
        fD.append('postImg', postImg);
        fD.append('text', text);
        createPost(fD);
        setText('');
        clearInput();
    }

    return (
        <MainBg>
            <div className="post-create">
                <form className="post-create__form"
                    onSubmit={onSubmitForm}>
                    <CustomTextArea
                        type="text"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        onFocus={() => setActiveSmiles(false)}
                        placeholder="Напишите что-нибудь...">
                    </CustomTextArea>

                    <div className="post-create__addition">
                        <i onClick={() => setActiveSmiles(true)} 
                            className="fas fa-laugh-wink">
                            {
                                activeSmiles ?
                                (<span
                                    className="picker">
                                    <Picker
                                        darkMode={theme === "light"} 
                                        onSelect={onSelectSmile} 
                                        set='apple'
                                    />
                                </span>)
                                : null
                            }
                           
                        </i>
                        <CustomInput
                            ref={inputFile}
                            name="postImg"
                            type="file"
                            id="file"
                            icon
                            label="Выбрать файл"
                            onChange={onChangeFile}
                        />
                    </div>
                    <CustomButton>Добавить пост</CustomButton>
                </form>
                {
                    imgPreview ? 
                        <div className="post_preview">
                        <img 
                            src={imgPreview}
                            alt={postImg.name}
                        />
                        <span
                            onClick={clearInput}
                            className="post_preview-delete">
                            Удалить
                        </span>
                        </div> : null
                }
            </div>
        </MainBg>
    );
}
const mapStateToProps = ({ theme }) => ({
    theme: theme.theme
});

export default connect(mapStateToProps, { createPost })(PostCreate);