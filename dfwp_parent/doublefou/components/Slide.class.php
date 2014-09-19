<?php

/**
 * @author Clément Biron
 * Slideshow
 */
class Slide
{
	var $_link = null;
	var $_imagePath = null;
	var $_image = null;
	
	public function __construct($pImage,$pLink = null)
	{
		$this->_imagePath = $pImage;
		$this->_image = basename($pImage);
		if($pLink != null){
			$this->_link = $pLink;
		}
	}
	
	public function getImagePath()
	{
		return $this->_imagePath;
	}
	
	public function getImage()
	{
		return $this->_image;
	}
	
	public function getLink()
	{
		return $this->_link;
	}
}

?>