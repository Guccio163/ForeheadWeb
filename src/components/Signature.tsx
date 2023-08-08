interface Props {
  isList?: boolean;
}

export default function Signature({ isList }: Props) {
  return (
    <p
      className="signature"
      style={{
        position: isList ? 'static' : 'absolute',
        textAlign: isList ? 'center' : 'initial',
        margin: isList ? '10px' : 'initial',
      }}
    >
      {' '}
      Czółko v.0.1{' '}
    </p>
  );
}
