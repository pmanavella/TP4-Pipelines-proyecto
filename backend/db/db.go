package db

import (
	"backend/clients/comments"
	"backend/clients/courses"
	"backend/clients/inscriptions"
	"backend/clients/users"
	"backend/models"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	log "github.com/sirupsen/logrus"
)

var (
	db  *gorm.DB
	err error
)

func init() {
	DBName := "arqsoft1"
	DBUser := "root"
	DBPass := "root"
	DBHost := "database"

	db, err = gorm.Open("mysql", DBUser+":"+DBPass+"@tcp("+DBHost+":3307)/"+DBName+"?charset=utf8&parseTime=True")

	if err != nil {
		log.Info("Connection Failed to Open")
		log.Fatal(err)
	} else {
		log.Info("Connection Established")
	}

	users.Db = db
	courses.Db = db
	inscriptions.Db = db
	comments.Db = db
}

func StartDbEngine() {
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Course{})
	db.AutoMigrate(&models.Inscription{})
	db.AutoMigrate(&models.Comment{})

	log.Info("Finishing Migration Database Tables")
}
