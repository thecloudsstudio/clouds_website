declare module '@paper-design/shaders-react' {
    import { CSSProperties } from 'react';

    interface MeshGradientProps {
        className?: string;
        style?: CSSProperties;
        colors?: string[];
        speed?: number;
        wireframe?: boolean;
        [key: string]: unknown;
    }

    export function MeshGradient(props: MeshGradientProps): JSX.Element;
}
