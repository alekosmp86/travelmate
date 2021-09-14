const OverlayLoading = () => {
  return (
    <>
      <div className="spinner-border text-primary" role="status"></div>
      <h5 className="loading-overlay-text">Loading map info... please wait</h5>
    </>
  );
};

export default OverlayLoading;