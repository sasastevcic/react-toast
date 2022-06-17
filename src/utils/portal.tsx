import { ReactNode, ReactPortal, useMemo } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
	portalId: string;
	children: ReactNode;
}

const Portal = ({ portalId, children }: PortalProps): ReactPortal => {
	const portalElement = useMemo(() => document.getElementById(portalId), [portalId]);

	if (!portalElement) {
		throw new Error(`Element not found! Element id: ${portalId}`);
	}

	return createPortal(children, portalElement);
};

export default Portal;
