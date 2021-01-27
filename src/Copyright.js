import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

export default function Copyright() {
    return (
        <>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <MuiLink color="inherit" href="https://htmlpdfconverter.com/">
                    htmlpdfconverter.com
                </MuiLink>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                <MuiLink color="inherit" href="https://github.com/xjodoin/htmlpdfconverter">
                    source
                </MuiLink>{' '}
            </Typography>
        </>
    );
}
