const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer"); 
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Categories Routes
router
  .route("/trendings")
  .get(wrapAsync(listingController.trendings));
router
  .route("/rooms")
  .get(wrapAsync(listingController.rooms));
router
  .route("/cities")
  .get(wrapAsync(listingController.cities));
router
  .route("/mountains")
  .get(wrapAsync(listingController.mountains));
router
  .route("/castles")
  .get(wrapAsync(listingController.castles));
router
  .route("/pools")
  .get(wrapAsync(listingController.pools));
router
  .route("/campings")
  .get(wrapAsync(listingController.campings));
router
  .route("/farms")
  .get(wrapAsync(listingController.farms));
router
  .route("/arctics")
  .get(wrapAsync(listingController.arctics));
router
  .route("/domes")
  .get(wrapAsync(listingController.domes));
router
  .route("/boats")
  .get(wrapAsync(listingController.boats));
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync (listingController.updateListing))
  .delete(isLoggedIn, isOwner,wrapAsync (listingController.destroyListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync (listingController.renderEditForm));

module.exports = router;  