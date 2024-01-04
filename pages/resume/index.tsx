import { PageHead } from '@/components/PageHead';
import React from 'react';

import * as config from '@/lib/config'

function Resume() {
    return <>
        <PageHead title="Resume" description="Waranont Chaosanguan's resume for application only" url={`${config.host}/resume`} image='https://images.unsplash.com/photo-1602407294553-6ac9170b3ed0?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' site={{name:config.name,domain:config.domain,rootNotionPageId:config.rootNotionPageId,rootNotionSpaceId:config.rootNotionSpaceId}} />
        <div style={{width:"100vw",height:"100vh",overflow:"hidden"}}>
            <iframe src="/Resume.pdf" width="100%" height="100%"/>
        </div>
    </> 
}

export default Resume;