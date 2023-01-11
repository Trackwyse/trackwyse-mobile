interface MapViewProps {
  route: any;
}

const MapView: React.FC<MapViewProps> = ({ route }) => {
  const { address }: { address: Address } = route.params;

  return <></>;
};

export default MapView;
