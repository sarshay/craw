import { Modal } from 'antd';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Is18PlusCover({ is18Plus }) {

    const [cookies, setCookie] = useCookies(["isUser18Plus"]);

    const navigate = useNavigate()
    const isUser18Plus = cookies.isUser18Plus == 'yes';
    const iAm18Plus = () => {
        setCookie('isUser18Plus', 'yes', { path: '/' })
    }
    return (
        <>
            {is18Plus && !isUser18Plus && <div
                style={{
                    height: '100vh',
                    backdropFilter: 'blur(20px)',
                    position: 'fixed',
                    right: 0,
                    left: 0,
                    top: 0,
                    bottom: 0
                }} />}
            <Modal
                warning
                open={is18Plus && !isUser18Plus}
                okText="ဟုတ်ပါသည်"
                cancelText="မဟုတ်ပါ"
                title="သင်သည် အသက် 18နှစ်နှင့် အထက်လား"
                onOk={iAm18Plus}
                onCancel={() => navigate(-1)}
            >
                ဤစာမျက်နာအား ဝင်ရောက်ရန် သင်သည် အသက် 18နှစ်နှင့် အထက်ဖြစ်ရပါမည်။
            </Modal>
        </>
    );
}

export default Is18PlusCover;