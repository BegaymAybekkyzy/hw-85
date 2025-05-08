import Typography from "@mui/material/Typography";
import TrackForm from "./components/TrackForm.tsx";

const AddTrack = () => {
  return (
    <div>
      <Typography
        variant="h3"
        color="textSecondary"
        textAlign="center"
        marginBottom={4}
      >
        Add track
      </Typography>

      <TrackForm />
    </div>
  );
};

export default AddTrack;
