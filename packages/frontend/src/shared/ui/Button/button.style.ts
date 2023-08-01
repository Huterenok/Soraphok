

import {styled} from 'panda/jsx';

export const ButtonUI = styled('button', {
  base: {
    backgroundColor: '#fff',
    border: '1px solid #000',
    color: '#000',
    padding: '0.5rem 1rem',

		"@media (max-width: 768px)": {
			color:"red"
		}
  },
	lg:{
		color:"red"
	}
})