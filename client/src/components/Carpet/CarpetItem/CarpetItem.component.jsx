import React from 'react';

import './CarpetItem.styles.scss';
import CustomButton from '../../CustomButton/CustomButton.component';

const CarpetItem = ({ carpet, setCarpet, userCarpet }) => {
    return (
        <div className="carpet-item">
            <img className="carpet-item_img"
                src={`/uploads/carpets/${carpet}`} alt={carpet} />
                {
                    userCarpet !== carpet ? 
                        <CustomButton
                            onClick={() => setCarpet(carpet)}>
                            Установить
                        </CustomButton>
                    :
                    <CustomButton
                        disabled={true}
                    >
                    Установлена
                    </CustomButton>
                }
        </div>
    );
}

export default CarpetItem;