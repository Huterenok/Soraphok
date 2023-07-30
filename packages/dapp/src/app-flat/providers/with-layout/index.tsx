import { Inter } from 'next/font/google';
import { ChildrenProps } from 'shared/config/types';
import '../../styles/index.css';

const inter = Inter({ subsets: ['latin'] });

export function WithLayout ({ children }:ChildrenProps) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
  </html>
	);
}
