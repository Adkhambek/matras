import React, {useState} from 'react';

const Switches = () => {
    const [color,setColor]=useState('#d0efd1')
    const [button,setButton]=useState('#12AF18')
    const [position,setposition]=useState('3px')
    return (
        <div className="orders">
            <div
                onClick={()=>{
                    if (color==='#d0efd1'){
                        setColor('#ccd7db')
                        setButton('#fff')
                        setposition('24px')

                    }else if (color==='#ccd7db'){
                        setColor('#d0efd1')
                        setButton('#12AF18')
                        setposition('3px')
                    }
                }} style={{backgroundColor:color}} className="switch">
                <div style={{backgroundColor:button,right:position}} className="switch-button"></div>
            </div>
        </div>
    );
};

export default Switches;
